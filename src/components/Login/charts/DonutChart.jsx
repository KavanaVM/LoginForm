import React from "react";
import * as d3 from "d3";
import { useRef, useEffect } from "react";

export default function DonutChart({ data, height }) {
  const colors = ["#8ce8ad", "#ff4136", "#87d3f2", "#c4c4cd", "#e6e6fa"];
  const chartRef = useRef(null);
  useEffect(() => {
    const tooltip = d3.select(".d3-tooltip");
    const width = 300;
    let radius = Math.min(width, height) / 2;

    d3.select(chartRef.current).selectAll("*").remove();

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", "100%")
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    let pie = d3.pie().value((d) => d.value);
    let data_ready = pie(data);

    svg
      .selectAll("*")
      .data(data_ready)
      .enter()
      .append("path")
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(radius / 1.75)
          .outerRadius(radius)
      )
      .attr("fill", (d) => colors[d.index])
      .attr("stroke", "#fff")
      .attr("stroke-width", "6")
      .style("opacity", "0.8")
      .on("mouseover", (event, d) => {
        tooltip.html(
          `<div class='tooltip-title'>${d.data.property}</div><div class='tooltip-value'>${d.data.value}</div>`
        );
        tooltip.style("display", "block");
      })
      .on("mousemove", (event, d) => {
        tooltip.style("top", event.pageY - 10 + "px");
        tooltip.style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", (event, d) => {
        tooltip.style("display", "none");
      });
  }, [data, height]);

  return <div ref={chartRef} />;
}
