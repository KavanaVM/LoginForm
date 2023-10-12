import React from "react";
import { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function BarChart(props) {
  const chartRef = useRef(null);

  useEffect(() => {
    const tooltip = d3.select(".d3-tooltip");
    const width = 300;
    const x = d3.scaleBand().rangeRound([0, width]).padding(0.3);
    const y = d3.scaleLinear().rangeRound([props.height, 0]);

    x.domain(props.data.map((d) => d.property));
    y.domain([0, d3.max(props.data, (d) => d.value)]);

    d3.select(chartRef.current).selectAll("*").remove();

    d3.select(chartRef.current)
      .append("svg")
      .attr("width", "100%")
      .attr("height", props.height)
      .append("g")
      .attr("transform", "translate(0,0)")
      .selectAll("rect")
      .data(props.data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.property))
      .attr("width", x.bandwidth())
      .attr("y", (d) => y(d.value))
      .attr("height", 0)
      .attr("fill", "#48cccd")
      .on("mouseover", (event, d) => {
        tooltip.html(
          `<div class='tooltip-title'>${d.property}</div><div class='tooltip-value'>${d.value}</div>`
        );
        tooltip.style("display", "block");
      })
      .on("mousemove", (event, d) => {
        tooltip.style("top", event.pageY - 10 + "px");
        tooltip.style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", (event, d) => {
        tooltip.style("display", "none");
      })
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => props.height - y(d.value));
  }, [props.height, props.data]);
  return <div ref={chartRef} />;
}
