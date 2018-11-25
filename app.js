$(function()
{
  let stocksList = [
            'GOOG',
            'AAPL',
            'TMUS',
            'CSCO',
            'V',
            'VZ',
            'AAXJ',
            'GE',
            'AMZN',
        ]; 
       // create buttons in HTML.
       const displayStockInfo = function () {

          const symbols = $(this).attr('data-name');
          const queryURL = `https://api.iextrading.com/1.0/stock/${symbols}/batch?types=quote,news&range=1m&last=1`;
          $.ajax({
            url: queryURL,
            method: 'GET'
          }).then(function(response) {
            $('#stocks-view').text(JSON.stringify(response));
          });
        }
        function render() {
    
          $('#buttons-view').empty();
        
          // Looping
          for (let i = 0; i < stocksList.length; i++) {
            let newButton = $('<button>');
            newButton.addClass('stock');
            newButton.attr('data-name', stocksList[i]);
            newButton.text(stocksList[i]);
            $('#buttons-view').append(newButton);
          }
        }
        
        // events button is clicked
        const addButton = function(event) {
        
          
          // hit enter instead of clicking the button 
          event.preventDefault();
        
          // pull the text from the input box
          const stock = $('#stock-input').val().trim();
          
          // add to array
          stocksList.push(stock);
        
          // Delete the former input
          $('#stock-input').val('');
        
          // render stock array
          render();
        }
        
        $('#add-stock').on('click', addButton);
        
        // Function for displaying the stock info
  
        $('#buttons-view').on('click', '.stock', displayStockInfo);
        
        render();
      
      });
 