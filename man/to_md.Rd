% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/to_md.R
\name{to_md}
\alias{to_md}
\title{Convert \code{gridlayout} to markdown table}
\usage{
to_md(layout, include_gap_size = TRUE)
}
\arguments{
\item{layout}{Object of class \code{"gridlayout"}.}

\item{include_gap_size}{Should the gap size for the layout be added in
upper-left of table?}
}
\value{
Markdown table that defines the grid layout. This can be used with
the function \code{grid_layout_from_md()} to build grid layouts.
}
\description{
Convert \code{gridlayout} to markdown table
}
\examples{

my_layout <- md_to_gridlayout("
  |      |        |       |       |
  |:-----|:-------|:------|:------|
  |10px  |120px   |1fr    |1fr    |
  |100px |header  |header |header |
  |1fr   |sidebar |plot_a |plot_c |
  |1fr   |sidebar |plot_b |plot_b |")
cat(to_md(my_layout))

}
