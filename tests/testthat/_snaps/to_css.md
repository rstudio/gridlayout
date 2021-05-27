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
         grid-column-start:1;
         grid-column-end:4;
         grid-row-start:1;
         grid-row-end:2;
         --collapsible-visibility:none;
         --collapsed-content-size:1fr;
      }
      #sidebar {
         grid-column-start:1;
         grid-column-end:2;
         grid-row-start:2;
         grid-row-end:4;
         --collapsible-visibility:none;
         --collapsed-content-size:1fr;
      }
      #plot_a {
         grid-column-start:2;
         grid-column-end:3;
         grid-row-start:2;
         grid-row-end:3;
         --collapsible-visibility:none;
         --collapsed-content-size:1fr;
      }
      #plot_b {
         grid-column-start:2;
         grid-column-end:4;
         grid-row-start:3;
         grid-row-end:4;
         --collapsible-visibility:none;
         --collapsed-content-size:1fr;
      }
      #plot_c {
         grid-column-start:3;
         grid-column-end:4;
         grid-row-start:2;
         grid-row-end:3;
         --collapsible-visibility:none;
         --collapsed-content-size:1fr;
      }
      
      
      
      .grid_panel {
        --card-padding: 0.8rem;
        box-sizing: border-box;
        overflow: hidden;
        display: grid;
        grid-template-areas: "title"
                             "content";
        /* When there's no title the column will dissapear */
        /* If we just use 1fr for the content, then it can
           sometimes overflow and cause the cell to be larger
           than it should. Not totally sure why but this
           css-tricks article contained the solution:
           https://css-tricks.com/preventing-a-grid-blowout/ */
        grid-template-rows: min-content minmax(0, 1fr);
      }
      
      .grid_panel .title-bar {
        grid-area: title;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: start;
        align-items: center;
        border-bottom: 1px solid rgba(0,0,0,0.125);
        padding: calc(var(--card-padding)/2) var(--card-padding);
      }
      .grid_panel .title-bar > h3 {
        margin: 0;
        height: 100%;
      }
      
      .panel-content {
        height: 100%;
        width: 100%;
        padding: var(--card-padding);
        grid-area: content;
      }
      
      .grid_panel .shiny-plot-output > img {
        /* The way grid sizing works can throw off the plot sizing in shiny. This
           is because the size of the parent grows to its largest child element.
           Shiny's plot output uses fixed pixel sizing. Shiny tries to update
           these sizes by looking at the parent div's dimensions after a resize.
           When the window has been made smaller, this means that the parent
           element is spilling outside of its box because the plot image size is
           still sitting at a fixed pixel width of the previous size. So when Shiny
           queries the size of the parent it thinks that nothing has changed. By
           setting a max width and height, we make sure the plot always gets shrunk
           to at most the size of the grid element, thus allowing the resize observer
           to work properly.
        */
        max-width: 100%;
        max-height: 100%;
      }
      
      /* Only set card styles if we're not using the bslib card component */
      .grid_panel:not(.card) {
        box-shadow: 0 0 0.5rem rgb(0 0 0 / 35%);
        border-radius: 0.5rem;
      }
      
      
      .grid_panel.collapsed  {
        /* If panel is not collapsible this css variable is defined as "block"
           which means that a panel that has been collapsed, and then resized
           to a scenario where it cant be collapsed, it will pop back
        */
        grid-template-rows: min-content var(--collapsed-content-size, 0);
        height: var(--collapsed-panel-height);
        overflow: var(--collapsed-panel-overflow);
      }
      
      
      /* Make flip arrow point down when collapsed and
         up when expanded to show result of clicking */
      .grid_panel .collapser-icon {
        display: var(--collapsible-visibility, none);
      }
      .grid_panel .collapser-icon svg {
        transition: transform 0.2s ease;
      }
      .grid_panel.collapsed .collapser-icon svg {
        transform: scaleY(-1);
      }
      
      /* Make everything line up nice and cleanly like it should in the middle */
      .text_panel {
        margin: 0;
        height: 100%;
        display: flex;
        align-items: center;
      }
      /* Everything should be inline so lining up works properly */
      .text_panel * {
        display: inline;
      }
      /* Make sure logo isn't right up next to the text */
      .text_panel > * {
        margin: 0 5px;
      }
      
      /* Makes it so tabpanels work in gridpanels */
      .grid_panel .tabbable { height: 100% }
      .grid_panel .tabbable > .nav { height: 42px; }
      .grid_panel .tabbable .tab-content { height: calc(100% - 42px); }
      .grid_panel .tabbable .tab-pane { height: 100%; }
      
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
         grid-column-start:1;
         grid-column-end:2;
         grid-row-start:1;
         grid-row-end:2;
         --collapsible-visibility:none;
         --collapsed-content-size:1fr;
      }
      #sidebar {
         grid-column-start:1;
         grid-column-end:2;
         grid-row-start:2;
         grid-row-end:3;
         --collapsible-visibility:none;
         --collapsed-content-size:1fr;
      }
      #plot_a {
         grid-column-start:1;
         grid-column-end:2;
         grid-row-start:3;
         grid-row-end:4;
         --collapsible-visibility:none;
         --collapsed-content-size:1fr;
      }
      #plot_b {
         grid-column-start:1;
         grid-column-end:2;
         grid-row-start:4;
         grid-row-end:5;
         --collapsible-visibility:none;
         --collapsed-content-size:1fr;
      }
      #plot_c {
         grid-column-start:1;
         grid-column-end:2;
         grid-row-start:5;
         grid-row-end:6;
         --collapsible-visibility:none;
         --collapsed-content-size:1fr;
      }
      
      }
      

