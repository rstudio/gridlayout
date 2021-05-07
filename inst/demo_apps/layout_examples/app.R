# App that takes its layout from options. Used to demo different layouts in the
# layout-examples.Rmd vignette.

library(gridlayout)
library(shiny)
library(ggplot2)
library(gt)
library(dplyr)
library(glue)

my_layout <- getOption("current_layout") %||% new_gridlayout(
  "
  |      |         |
  |------|---------|
  |1rem  |1fr      |
  |80px  |header   |
  |1fr   |chickens |
  |1fr   |treePlot |
  |1fr   |yarnPlot |"
)


chick_plot <- plotOutput("chickPlot", height = "100%")
chick_table <- gt_output("chickTable")

no_tab_layout <- "chickPlot" %in% extract_chr(get_elements(my_layout), "id")

# The classic Geyser app with grid layout
app <- shinyApp(
  ui = grid_page(
    layout = my_layout,
    theme = bslib::bs_theme(),
    use_bslib_card_styles = TRUE,
    header = title_panel("My gridlayout app"),
    chickens = if(!no_tab_layout) tabsetPanel(
      tabPanel("Plot", chick_plot),
      tabPanel("Fastest growing", chick_table)
    ),
    chickPlot =  if(no_tab_layout) chick_plot,
    chickTable = if(no_tab_layout) chick_table,
    treePlot = plotOutput("treePlot", height = "100%"),
    yarnPlot = plotOutput("yarnPlot", height = "100%")
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

    output$chickTable <- render_gt({
      ChickWeight %>%
        group_by(Chick) %>%
        summarise(
          `Diet` = first(Diet),
          `start weight` = first(weight),
          `end weight` = last(weight),
          `weight change rate` = (last(weight) - first(weight)) / last(Time)
        ) %>%
        arrange(desc(`weight change rate`)) %>%
        head(8) %>%
        gt() %>%
        tab_header(
          title = "8 fastest growing chicks"
        ) %>%
        fmt_number(
          columns = c(`start weight`,`end weight`),
          pattern = "{x}<sub>g</sub>",
          decimals = 1
        ) %>%
        fmt_number(
          columns = c(`weight change rate`),
          pattern = "{x}<sub>g/day</sub>",
          decimals = 2
        )
    },
    height = "100%",
    width = "100%")

    output$treePlot <- renderPlot({
      ggplot(
        trees,
        aes(y = Height, x = Volume, size = Girth*2)
      ) +
        geom_point(alpha = 0.6) +
        scale_radius() +
        labs(
          title = "Tree height and volume and diameter",
          size = "Diameter"
        )
    })

    output$yarnPlot <- renderPlot({
      ggplot(
        warpbreaks,
        aes(x = breaks, fill = wool)
      ) +
        geom_dotplot(binwidth = 1, method = "histodot") +
        facet_grid(tension ~ .) +
        scale_y_continuous(NULL, breaks = NULL) +
        ggtitle("Breaks in different yarns by tension")
    })

    output$stockTable <- render_gt({
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
    height = "100%",
    width = "100%")
  }
)


