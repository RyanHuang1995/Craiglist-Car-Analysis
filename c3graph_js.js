// Range 0 - 3000
var range1 = 0;

// Range 3000 - 6000
var range2 = 0;

// Range 6000 - 9000
var range3 = 0;

// Range 9000 - 12000
var range4 = 0;

// Range 12000-15000
var range5 = 0; 

// Range 15000-18000
var range6 = 0;

// Range 18000-21000
var range7 = 0;

//// Range 21000-24000
var range8 = 0;

var numbers = [];

// Read the CSV, then compare the price to the range -> for loop
console.log('Before D3 CSV');
// For loop
d3.csv('Craigslist.csv').then( function(data) {
  // console.log('This is data: ', data)
  for(let i = 0; i < data.length; i++) {
    numbers.push(parseInt(data[i]['Price']))
    console.log(typeof parseInt(data[i]['Price']));
    
    if (parseInt(data[i]['Price']) >= 0 && parseInt(data[i]['Price']) <= 3000) {
      console.log('Inside condition 1')
      range1++
    } else if (parseInt(data[i]['Price']) >= 3001 && parseInt(data[i]['Price']) <= 6000) {
      console.log('Inside condition 2')
      range2++
    } else if (parseInt(data[i]['Price']) >= 6001 && parseInt(data[i]['Price']) <= 9000 ) {
      console.log('Inside condition 3')
      range3++
    } else if (parseInt(data[i]['Price']) >= 9001 && parseInt(data[i]['Price']) <= 12000 ) {
      console.log('Inside condition 4')
      range4++
    }else if (parseInt(data[i]['Price']) >= 12001 && parseInt(data[i]['Price']) <= 15000 ) {
      console.log('Inside condition 5')
      range5++
    }else if (parseInt(data[i]['Price']) >= 15001 && parseInt(data[i]['Price']) <= 18000 ) {
      console.log('Inside condition 6')
      range6++
    }else if (parseInt(data[i]['Price']) >= 18001 && parseInt(data[i]['Price']) <= 21000 ) {
      console.log('Inside condition 7')
      range7++
    }else if (parseInt(data[i]['Price']) >= 21001 && parseInt(data[i]['Price']) <= 24000 ) {
      console.log('Inside condition 8')
      range8++  
    };
  }

  console.log('range1: ', range1)
  console.log('range2: ', range2)
  console.log('range3: ', range3)
  console.log('range4: ', range4)
  console.log('range5: ', range5)
  console.log('range6: ', range6)
  console.log('range7: ', range7)
  console.log('range8: ', range8)

  console.log(numbers)

  
  var chart = c3.generate({
    bindto: '#chart',
    data: {
        columns: [
          
            ['0-3K', range1],
            ['3K-6K', range2],
            ['6K-9K', range3],
            ['9K-12K', range4],
            ['12k-15k',range5],
            ['15k-18k',range6],
            ['18k-21k',range7],
            ['21k-24k',range8]
        ],

        type: 'bar'
    },
    bar: {
        width: {
            ratio: 0.4 // this makes bar width 50% of length between ticks
        }
        // or
        //width: 100 // this makes bar width 100px
    },
    axis: {
      x: {
        categories: ['Category 1', 'Category 2']
      },

    axis: {
      x: {
          label: 'X Label'
          },
      y: {
          label: 'Y Label'
      },

        
      }
    }
  });
})

// var chart = c3.generate({
//   bindto: '#chart',
//   data: {
//     x: 'x',
//     //        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
//     columns: [
//       ['x', '2018-01-01', '2018-01-02', '2018-01-03', '2018-01-04', '2018-01-05', '2018-01-06'],
//       //            ['x', '20180101', '20180102', '20180103', '20180104', '20180105', '20180106'],
//       ['data1', 30, 200, 100, 400, 150, 250],
//       ['data2', 130, 340, 200, 500, 250, 350]
//     ]
//   },
//   axis: {
//     x: {
//       type: 'timeseries',
//       tick: {
//         format: '%Y-%m-%d'
//       }
//     }
//   }
// });