# Demonstrates the ability for grid panels to scroll for content larger than
# their designated size. Here we have a 600px tall plot fitting into a 400px
# tall panel and a table fitting into a 200px tall panel.
library(gridlayout)
library(shiny)
library(ggplot2)
library(gt)
library(dplyr)
library(glue)

shinyApp(
  ui = grid_page(
    layout = new_gridlayout("
      |1rem  |1fr        |
      |80px  |header     |
      |400px |chickPlot  |
      |200px |stockTable |"),
    grid_card_text("header", "Scrollable panels", is_title = TRUE),
    grid_card(
      "chickPlot",
      plotOutput("chickPlot", height = "600px"),
      scrollable = TRUE
    ),
    grid_card(
      area= "stockTable",
      gt_output("stockTable"),
      scrollable = TRUE
    )
  ),
  server = function(input, output) {
    output$chickPlot <- renderPlot({
      ggplot(
        ChickWeight,
        aes(
          x = Time,
          y = weight,
          group = Chick,
          color = Diet
        )
      ) +
        geom_line(alpha = 0.5) +
        ggtitle("Chick weights by diet")
    })

    output$stockTable <- render_gt(
      {
        # Define the start and end dates for the data range
        start_date <- "2010-06-07"
        end_date <- "2010-06-14"

        # Create a gt table based on preprocessed
        # `sp500` table data
        sp500 %>%
          filter(date >= start_date & date <= end_date) %>%
          select(-adj_close) %>%
          gt() %>%
          tab_header(
            title = "S&P 500",
            subtitle = glue::glue("{start_date} to {end_date}")
          ) %>%
          fmt_date(
            columns = date,
            date_style = 3
          ) %>%
          fmt_currency(
            columns = c(open, high, low, close),
            currency = "USD"
          ) %>%
          fmt_number(
            columns = volume,
            suffixing = TRUE
          )
      },
      width = "100%"
    )
  }
)
