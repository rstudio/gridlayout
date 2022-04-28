# Handles an explicit missing row provided with dots

    Code
      new_gridlayout(layout_def = "\n      | header | header |\n      | plota  | plotb  |\n      | .      | .      |",
        row_sizes = c("200px", "1fr", "2fr"))
    Output
      gridlayout of 3 elements: 
              1fr    1fr   
        200px header header
        1fr   plota  plotb 
        2fr   .      .     
      Gap of 2rem. Total height of viewport.
      
      Alternate layouts:  
        
        - Width < 500px 
                 1fr   
          85px  header
          350px plota 
          350px plotb 
        Gap of 2rem. Total height of auto.

---

    Code
      new_gridlayout(layout_def = "\n      | header | header | . |\n      | plota  | plotb  | . |",
        col_sizes = c("200px", "1fr", "2fr"))
    Output
      gridlayout of 3 elements: 
            200px  1fr    2fr
        1fr header header .  
        1fr plota  plotb  .  
      Gap of 2rem. Total height of viewport.
      
      Alternate layouts:  
        
        - Width < 500px 
                 1fr   
          85px  header
          350px plota 
          350px plotb 
        Gap of 2rem. Total height of auto.

