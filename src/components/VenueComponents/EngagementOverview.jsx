// components/EngagementOverview.js
"use client";

import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const lineChartOptions = {
  chart: {
    id: "profile-views",
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  xaxis: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    labels: {
      style: {
        colors: "#6B7280",
      },
    },
  },
  yaxis: {
    show: false,
  },
  grid: {
    show: false,
  },
  colors: ["#1E293B"],
};

const barChartOptions = {
  chart: {
    id: "booking-requests",
    toolbar: { show: false },
  },
  plotOptions: {
    bar: {
      columnWidth: "40%",
      borderRadius: 4,
    },
  },
  xaxis: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    labels: {
      style: {
        colors: "#6B7280",
      },
    },
  },
  yaxis: {
    show: false,
  },
  grid: {
    show: false,
  },
  colors: ["#CBD5E1"],
};

const EngagementOverview = () => {
  const lineChartSeries = [
    {
      name: "Profile Views",
      data: [10, 15, 12, 9, 25, 10, 20],
    },
  ];

  const barChartSeries = [
    {
      name: "Booking Requests",
      data: [6, 5, 5, 5, 5, 5, 5],
    },
  ];

  return (
    <div className="  w-full">
      <h2 className="text-base md:text-lg font-semibold text-[#121417] mb-6">
        Engagement Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Views */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-[#121417]">Profile Views</p>
          <p className="text-xl font-bold text-[#121417] mt-1">+15%</p>
          <p className="text-xs text-green-500 mb-2">Last 7 Days +15%</p>
          <Chart
            options={lineChartOptions}
            series={lineChartSeries}
            type="line"
            height={180}
          />
        </div>

        {/* Booking Requests */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-[#121417]">Booking Requests</p>
          <p className="text-xl font-bold text-[#121417] mt-1">-5%</p>
          <p className="text-xs text-red-500 mb-2">Last 7 Days -5%</p>
          <Chart
            options={barChartOptions}
            series={barChartSeries}
            type="bar"
            height={180}
          />
        </div>
      </div>
      <hr className="mt-6 border-gray-200" />
    </div>
  );
};

export default EngagementOverview;
