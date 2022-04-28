# Works with default body target

    Code
      cat(to_css(grid_obj))
    Output
      
      body {
        display:grid;
        grid-template-rows:100px 1fr 1fr;
        grid-template-columns:120px 1fr 1fr;
        grid-template-areas:
          "header  header header"
          "sidebar plot_a plot_c"
          "sidebar plot_b plot_b";
        grid-gap:2rem;
        padding:2rem;
        height:100vh;
      }
      
      
      
      @media (max-width:500px) {
        body {
          display:grid;
          grid-template-rows:85px 350px 350px 350px 350px;
          grid-template-columns:1fr;
          grid-template-areas:
            "header "
            "sidebar"
            "plot_a "
            "plot_b "
            "plot_c ";
          grid-gap:2rem;
          padding:2rem;
          height:auto;
        }
      }
      

# Panel collapsibility rules are added as needed

    Code
      cat(to_css(grid_obj))
    Output
      
      body {
        display:grid;
        grid-template-rows:80px auto 400px;
        grid-template-columns:1fr;
        grid-template-areas:
          "header "
          "sidebar"
          "plot   ";
        grid-gap:2rem;
        padding:2rem;
        height:100vh;
      }
      body > div[data-gridlayout-area="sidebar"] {
        --collapsible-visibility:block;
        --collapsed-content-size:0;
        --collapsed-panel-height:min-content;
        --collapsed-panel-overflow:hidden;
      }
      
      
      @media (max-width:500px) {
        body {
          display:grid;
          grid-template-rows:85px 350px 350px;
          grid-template-columns:1fr;
          grid-template-areas:
            "header "
            "sidebar"
            "plot   ";
          grid-gap:2rem;
          padding:2rem;
          height:auto;
        }
      }
      

