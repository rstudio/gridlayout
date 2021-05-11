# Markdown parsing -- All sizes provided

    Code
      new_gridlayout(
        "\n|2rem  |200px   |1fr    |\n|80px  |header  |header |\n|1fr   |sidebar |plot   |")
    Output
      gridlayout with 2 rows, 2 columns, and gap size of 2rem. Total height of viewport.
           200px   1fr   
      80px header  header
      1fr  sidebar plot  
      
      Alternative layouts:
      
      When width of page < 600px 
      gridlayout with 3 rows, 1 columns, and gap size of 1rem. Total height of auto.
            1fr    
      85px  header 
      350px sidebar
      350px plot   

# Markdown parsing -- Only row sizes

    Code
      new_gridlayout("\n|80px  |header  |header |\n|1fr   |sidebar |plot   |")
    Output
      gridlayout with 2 rows, 2 columns, and gap size of 1rem. Total height of viewport.
           1fr     1fr   
      80px header  header
      1fr  sidebar plot  
      
      Alternative layouts:
      
      When width of page < 600px 
      gridlayout with 3 rows, 1 columns, and gap size of 1rem. Total height of auto.
            1fr    
      85px  header 
      350px sidebar
      350px plot   

# Markdown parsing -- Only col sizes

    Code
      new_gridlayout("\n|200px   |1fr    |\n|header  |header |\n|sidebar |plot   |")
    Output
      gridlayout with 2 rows, 2 columns, and gap size of 1rem. Total height of viewport.
          200px   1fr   
      1fr header  header
      1fr sidebar plot  
      
      Alternative layouts:
      
      When width of page < 600px 
      gridlayout with 3 rows, 1 columns, and gap size of 1rem. Total height of auto.
            1fr    
      85px  header 
      350px sidebar
      350px plot   

# Markdown parsing -- Gap and row sizes

    Code
      new_gridlayout(
        "\n|2rem  |        |       |\n|80px  |header  |header |\n|1fr   |sidebar |plot   |")
    Output
      gridlayout with 2 rows, 2 columns, and gap size of 2rem. Total height of viewport.
           1fr     1fr   
      80px header  header
      1fr  sidebar plot  
      
      Alternative layouts:
      
      When width of page < 600px 
      gridlayout with 3 rows, 1 columns, and gap size of 1rem. Total height of auto.
            1fr    
      85px  header 
      350px sidebar
      350px plot   

# Markdown parsing -- Only gap size

    Code
      new_gridlayout(
        "\n|2rem  |        |       |\n|      |header  |header |\n|      |sidebar |plot   |")
    Output
      gridlayout with 2 rows, 2 columns, and gap size of 2rem. Total height of viewport.
          1fr     1fr   
      1fr header  header
      1fr sidebar plot  
      
      Alternative layouts:
      
      When width of page < 600px 
      gridlayout with 3 rows, 1 columns, and gap size of 1rem. Total height of auto.
            1fr    
      85px  header 
      350px sidebar
      350px plot   

# Markdown parsing -- Single column

    Code
      new_gridlayout(
        "\n|----- |--------|\n|2rem  |1fr     |\n|80px  |header  |\n|auto  |sidebar |\n|400px |plot    |")
    Output
      gridlayout with 3 rows, 1 columns, and gap size of 2rem. Total height of auto.
            1fr    
      80px  header 
      auto  sidebar
      400px plot   
      
      Alternative layouts:
      
      When width of page < 600px 
      gridlayout with 3 rows, 1 columns, and gap size of 1rem. Total height of auto.
            1fr    
      85px  header 
      350px sidebar
      350px plot   

# Markdown parsing -- Single row

    Code
      new_gridlayout(
        "\n|2rem  |auto   | 200px  | 1fr    |\n|80px  |header |sidebar |sidebar |")
    Output
      gridlayout with 1 rows, 3 columns, and gap size of 2rem. Total height of auto.
           auto   200px   1fr    
      80px header sidebar sidebar
      
      Alternative layouts:
      
      When width of page < 600px 
      gridlayout with 2 rows, 1 columns, and gap size of 1rem. Total height of auto.
            1fr    
      85px  header 
      350px sidebar

# Markdown parsing -- No sizes

    Code
      new_gridlayout("\n|header  |header |\n|sidebar |plot   |")
    Output
      gridlayout with 2 rows, 2 columns, and gap size of 1rem. Total height of viewport.
          1fr     1fr   
      1fr header  header
      1fr sidebar plot  
      
      Alternative layouts:
      
      When width of page < 600px 
      gridlayout with 3 rows, 1 columns, and gap size of 1rem. Total height of auto.
            1fr    
      85px  header 
      350px sidebar
      350px plot   

