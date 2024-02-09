import React from "react";
import { useState, useRef, useEffect } from "react";
import * as d3 from 'd3';
import '../static/css/Main.css';



const TreeDiagram = ({ data }) => {
    const d3Container = useRef(null);
  
    useEffect(() => {
      if (data && d3Container.current) {
        // Container cleanup
        d3.select(d3Container.current).selectAll("*").remove();
  
        const margin = { top: 50, right: 90, bottom: 30, left: 90 };
        const width = 960 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;
  
        const svg = d3.select(d3Container.current)
          .attr("width", width + margin.right + margin.left)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
        // Convert the data to a hierarchy
        const root = d3.hierarchy(data, d => d.friends);
  
        // Create the tree layout
        const treeLayout = d3.tree().size([height, width]);
        treeLayout(root);
  
        // Draw the links (curved for a modern look)
        const link = svg.selectAll(".link")
          .data(root.links())
          .enter().append("path")
          .attr("class", "link")
          .style("fill", "none")
          .style("stroke", "#ffab00") // Styling to match the provided image
          .style("stroke-width", 3)
          .attr("d", d => {
            return "M" + d.source.y + "," + d.source.x
              + "C" + (d.source.y + d.target.y) / 2 + "," + d.source.x
              + " " + (d.source.y + d.target.y) / 2 + "," + d.target.x
              + " " + d.target.y + "," + d.target.x;
          });
  
        // Draw the nodes
        const node = svg.selectAll(".node")
          .data(root.descendants())
          .enter().append("g")
          .attr("class", d => "node" + (d.children ? " node--internal" : " node--leaf"))
          .attr("transform", d => "translate(" + d.y + "," + d.x + ")");
  
        node.append("circle")
          .attr("r", 15) // Radius to match the provided image
          .style("fill", "#1c7ed6"); // Node color to match the provided image
  
        node.append("text")
          .attr("dy", ".35em")
          .attr("x", d => d.children ? -20 : 20)
          .style("text-anchor", d => d.children ? "end" : "start")
          .text(d => d.data.fname + ' ' + d.data.lname)
          .style("fill", "#333"); // Text color to match the provided image
      }
    }, [data]);
  
    return (
      <svg ref={d3Container} className="tree-container" />
    );
  };

  

export default function Main(){
    const [user, setUser] = useState({username:'', token:'', isadmin:false});
    let students = {
        fname:'muxtar',
        lname:'bayramov',
        city:'baki',
        avto:['Bmw x6', 'Kia optima'],
        friends:[
            {
                fname:'veli',
                lname:'qurbanov',
                city:'seki',
                avto:['Bmw x6', 'Kia optima'],
                friends:[]
            }
        ]
    }
    window.USER.download((event, data)=>{
        setUser(JSON.parse(data))
    })
    return(
        <div className="">
            {/* <header>{username}</header> */}
            <div className="body">
                <div className="chat">user =={user.username}</div>
            </div>
        </div>
    )
}