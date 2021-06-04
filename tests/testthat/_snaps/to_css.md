# Works with default body target

    Code
      cat(to_css(grid_obj))
    Output
      
      body {
         display:grid;
         grid-template-rows:100px 1fr 1fr;
         grid-template-columns:120px 1fr 1fr;
         grid-gap:1rem;
         padding:1rem;
         height:100vh;
      }
      #header {
         grid-area:1 / 1 / 2 / 4;
         --collapsible-visibility:none;
         --collapsed-content-size:1fr;
      }
      #sidebar {
         grid-area:2 / 1 / 4 / 2;
         --collapsible-visibility:none;
         --collapsed-content-size:1fr;
      }
      #plot_a {
         grid-area:2 / 2 / 3 / 3;
         --collapsible-visibility:none;
         --collapsed-content-size:1fr;
      }
      #plot_b {
         grid-area:3 / 2 / 4 / 4;
         --collapsible-visibility:none;
         --collapsed-content-size:1fr;
      }
      #plot_c {
         grid-area:2 / 3 / 3 / 4;
         --collapsible-visibility:none;
         --collapsed-content-size:1fr;
      }
      
      
      @media (max-width:500px) {
         body {
            display:grid;
            grid-template-rows:85px 350px 350px 350px 350px;
            grid-template-columns:1fr;
            grid-gap:1rem;
            padding:1rem;
            height:auto;
         }
         #header {
            grid-area:1 / 1 / 2 / 2;
            --collapsible-visibility:none;
            --collapsed-content-size:1fr;
         }
         #sidebar {
            grid-area:2 / 1 / 3 / 2;
            --collapsible-visibility:none;
            --collapsed-content-size:1fr;
         }
         #plot_a {
            grid-area:3 / 1 / 4 / 2;
            --collapsible-visibility:none;
            --collapsed-content-size:1fr;
         }
         #plot_b {
            grid-area:4 / 1 / 5 / 2;
            --collapsible-visibility:none;
            --collapsed-content-size:1fr;
         }
         #plot_c {
            grid-area:5 / 1 / 6 / 2;
            --collapsible-visibility:none;
            --collapsed-content-size:1fr;
         }
      }
      

