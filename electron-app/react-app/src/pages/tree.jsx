import React from "react";
import Tree from 'react-d3-tree';

const a = {
    name: 'user',
    username: 'muxtar',
    city: 'baki',
    age: 31,
    cars: [
      {
        marka: 'bmw',
        model: 'x5',
        price: '30$',
        color: 'black'
      },
      {
        marka: 'toyota',
        model: 'rav4',
        price: '25$',
        color: 'blue'
      }
    ],
    friends: [
      {
        username: 'eli',
        city: 'baki',
        age: 31,
        cars: [],
        friends: []
      },
      {
        username: 'veli',
        cars: [],
        friends: [
          {
            username: 'eli',
            cars: [
              {
                marka: 'bmw',
                model: 'x5',
                price: '30$',
                color: 'black'
              },
              {
                marka: 'toyota',
                model: 'rav4',
                price: '25$',
                color: 'blue'
              },
              {
                marka: 'bmw',
                model: 'x5',
                price: '30$',
                color: 'black'
              },
              {
                marka: 'toyota',
                model: 'rav4',
                price: '25$',
                color: 'blue'
              }
            ],
            friends: [
              {
                username: 'eli',
                cars: [],
                friends: []
              },
              {
                username: 'veli',
                cars: [],
                friends: []
              }
            ]
          },
          {
            username: 'veli',
            city: 'baki',
            age: 31,
            cars: [],
            friends: [
              {
                username: 'eli',
                cars: [],
                friends: []
              },
              {
                username: 'veli',
                cars: [],
                friends: []
              }
            ]
          }
        ]
      }
    ],
    qohum: [
      {
        username: 'eli',
        cars: [
          {
            marka: 'bmw',
            model: 'x5',
            price: '30$',
            color: 'black'
          },
          {
            marka: 'toyota',
            model: 'rav4',
            price: '25$',
            color: 'blue'
          }
        ],
        friends: [],
        qohum: [
          {
            username: 'eli',
            cars: [],
            friends: []
          },
          {
            username: 'veli',
            cars: [
              {
                marka: 'bmw',
                model: 'x5',
                price: '30$',
                color: 'black'
              },
              {
                marka: 'toyota',
                model: 'rav4',
                price: '25$',
                color: 'blue'
              }
            ],
            friends: []
          }
        ],
        islediyi_sirket:[
          {
            adi:'ATL Academy',
            selery:3000,
            start_year:2021,
            finish_year:'current'
          },
          {
            adi:'Step',
            selery:2000,
            start_year:2020,
            finish_year:2022
          }
        ]
      },
      {
        username: 'veli',
        cars: [],
        friends: [],
        qohum: [
          {
            username: 'eli',
            cars: [],
            friends: []
          },
          {
            username: 'veli',
            cars: [],
            friends: []
          }
        ],
        islediyi_sirket:[
          {
            adi:'ATL Academy',
            selery:3000,
            start_year:2021,
            finish_year:'current'
          },
          {
            adi:'Step',
            selery:2000,
            start_year:2020,
            finish_year:2022
          }
        ]
      }
    ],
    islediyi_sirket:[
      {
        adi:'ATL Academy',
        selery:3000,
        start_year:2021,
        finish_year:'current'
      },
      {
        adi:'Step',
        selery:2000,
        start_year:2020,
        finish_year:2022
      }
    ]
};
  
function transformToTreeData(obj) {
    let treeData = {
    name: obj.username || 'Unknown',
    children: []
    };

    // Arabaları çocuk düğüm olarak ekleme
    if (obj.cars && obj.cars.length > 0) {
    treeData.children.push({
        name: 'Cars',
        children: obj.cars.map(car => ({
        name: `${car.marka} ${car.model}`,
        attributes: {
            price: car.price,
            color: car.color
        }
        }))
    });
    }

    // Arkadaşları çocuk düğüm olarak ekleme
    if (obj.friends && obj.friends.length > 0) {
    treeData.children.push({
        name: 'Friends',
        children: obj.friends.map(friend => transformToTreeData(friend))
    });
    }

    // Qohumları çocuk düğüm olarak ekleme
    if (obj.qohum && obj.qohum.length > 0) {
    treeData.children.push({
        name: 'Relatives',
        children: obj.qohum.map(relative => transformToTreeData(relative))
    });
    }

    // İşlediyi şirketleri çocuk düğüm olarak ekleme
    if (obj.islediyi_sirket && obj.islediyi_sirket.length > 0) {
    treeData.children.push({
        name: 'Companies',
        children: obj.islediyi_sirket.map(company => ({
        name: company.adi,
        attributes: {
            salary: company.selery,
            start_year: company.start_year,
            finish_year: company.finish_year
        }
        }))
    });
    }

    return treeData;
}
  
const treeData = transformToTreeData(a);
  
export default function Treejsx(){
    return(
        <div className={["tree in-div"]}>          
            <div id="treeWrapper" style={{ width: '100%', height: '100%' }}>
                <Tree data={treeData} orientation="vertical"/>
            </div> 
        </div>
    )
}