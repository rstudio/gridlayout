% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/to_css.R
\name{build_css_rule}
\alias{build_css_rule}
\title{Build css properties named or unnamed list of property values}
\usage{
build_css_rule(selector, prop_list)
}
\arguments{
\item{selector}{valid css selector to target. E.g. \code{body} or
\code{div.blue_boxes}... For inline styles where no selector is desired use
\code{"inline"}.}

\item{prop_list}{A list of property-value pairs for additional styles to be
added to each element. Pairs can be given as named elements: e.g.
\code{prop_list = c("background" = "blue")}. See \link[htmltools:css]{htmltools::css} for rules
on formatting.}
}
\value{
A concatenated string of property values to be used inside a css
selector. If the \code{prop_list} is empty, an empty string (\code{""}) is returned
to avoid placing empty css rules on the webpage.
}
\description{
Build css properties named or unnamed list of property values
}
\keyword{internal}
