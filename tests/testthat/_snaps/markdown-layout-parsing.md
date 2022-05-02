# Markdown parsing -- All sizes provided

    Code
      new_gridlayout(
        "\n|2rem  |200px   |1fr    |\n|80px  |header  |header |\n|1fr   |sidebar |plot   |")
    Output
      gridlayout of 3 elements: 
             200px   1fr   
        80px header  header
        1fr  sidebar plot  
      Gap of 2rem. Total height of viewport.
      
      Alternate layouts:  
        
        - Width < 500px 
                 1fr    
          85px  header 
          350px sidebar
          350px plot   
        Gap of 2rem. Total height of auto.

# Markdown parsing -- Only row sizes

    Code
      new_gridlayout("\n|80px  |header  |header |\n|1fr   |sidebar |plot   |")
    Output
      gridlayout of 3 elements: 
             1fr     1fr   
        80px header  header
        1fr  sidebar plot  
      Gap of 12px. Total height of viewport.
      
      Alternate layouts:  
        
        - Width < 500px 
                 1fr    
          85px  header 
          350px sidebar
          350px plot   
        Gap of 12px. Total height of auto.

# Markdown parsing -- Only col sizes

    Code
      new_gridlayout("\n|200px   |1fr    |\n|header  |header |\n|sidebar |plot   |")
    Output
      gridlayout of 3 elements: 
            200px   1fr   
        1fr header  header
        1fr sidebar plot  
      Gap of 12px. Total height of viewport.
      
      Alternate layouts:  
        
        - Width < 500px 
                 1fr    
          85px  header 
          350px sidebar
          350px plot   
        Gap of 12px. Total height of auto.

# Markdown parsing -- Gap and row sizes

    Code
      new_gridlayout(
        "\n|2rem  |        |       |\n|80px  |header  |header |\n|1fr   |sidebar |plot   |")
    Output
      gridlayout of 3 elements: 
             1fr     1fr   
        80px header  header
        1fr  sidebar plot  
      Gap of 2rem. Total height of viewport.
      
      Alternate layouts:  
        
        - Width < 500px 
                 1fr    
          85px  header 
          350px sidebar
          350px plot   
        Gap of 2rem. Total height of auto.

# Markdown parsing -- Only gap size

    Code
      new_gridlayout(
        "\n|3rem  |        |       |\n|      |header  |header |\n|      |sidebar |plot   |")
    Output
      gridlayout of 3 elements: 
            1fr     1fr   
        1fr header  header
        1fr sidebar plot  
      Gap of 3rem. Total height of viewport.
      
      Alternate layouts:  
        
        - Width < 500px 
                 1fr    
          85px  header 
          350px sidebar
          350px plot   
        Gap of 3rem. Total height of auto.

# Markdown parsing -- Single column

    Code
      new_gridlayout(
        "\n|----- |--------|\n|2rem  |1fr     |\n|80px  |header  |\n|auto  |sidebar |\n|400px |plot    |")
    Output
      gridlayout of 3 elements: 
              1fr    
        80px  header 
        auto  sidebar
        400px plot   
      Gap of 2rem. Total height of auto.
      
      Alternate layouts:  
        
        - Width < 500px 
                 1fr    
          85px  header 
          350px sidebar
          350px plot   
        Gap of 2rem. Total height of auto.

# Markdown parsing -- Single row

    Code
      new_gridlayout(
        "\n|2rem  |auto   | 200px  | 1fr    |\n|80px  |header |sidebar |sidebar |")
    Output
      gridlayout of 2 elements: 
             auto   200px   1fr    
        80px header sidebar sidebar
      Gap of 2rem. Total height of auto.
      
      Alternate layouts:  
        
        - Width < 500px 
                 1fr    
          85px  header 
          350px sidebar
        Gap of 2rem. Total height of auto.

# Markdown parsing -- No sizes

    Code
      new_gridlayout("\n|header  |header |\n|sidebar |plot   |")
    Output
      gridlayout of 3 elements: 
            1fr     1fr   
        1fr header  header
        1fr sidebar plot  
      Gap of 12px. Total height of viewport.
      
      Alternate layouts:  
        
        - Width < 500px 
                 1fr    
          85px  header 
          350px sidebar
          350px plot   
        Gap of 12px. Total height of auto.

