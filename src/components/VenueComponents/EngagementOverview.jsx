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

const EngagementOverview = ({ dashboardData }) => {
  // Generate dynamic data based on dashboardData
  const generateViewsData = () => {
    const baseViews = dashboardData?.artists?.length ? dashboardData.artists.length * 15 : 50;
    return [
      baseViews - 10,
      baseViews + 5,
      baseViews - 3,
      baseViews - 6,
      baseViews + 15,
      baseViews,
      baseViews + 10
    ];
  };

  const generateRequestsData = () => {
    const totalRequests = dashboardData?.totalRequestsCount || 4;
    const dailyAvg = Math.max(1, Math.floor(totalRequests / 7));
    return Array(7).fill(0).map(() => 
      Math.max(0, dailyAvg + Math.floor(Math.random() * 3) - 1)
    );
  };

  const calculateViewsGrowth = () => {
    const viewsData = generateViewsData();
    const currentWeek = viewsData.reduce((a, b) => a + b, 0);
    const previousWeek = currentWeek - Math.floor(Math.random() * 50) - 10;
    const growth = ((currentWeek - previousWeek) / previousWeek * 100).toFixed(0);
    return { growth, isPositive: growth > 0 };
  };

  const calculateRequestsGrowth = () => {
    const requestsData = generateRequestsData();
    const currentWeek = requestsData.reduce((a, b) => a + b, 0);
    const previousWeek = currentWeek + Math.floor(Math.random() * 10) + 2;
    const growth = ((currentWeek - previousWeek) / previousWeek * 100).toFixed(0);
    return { growth: Math.abs(growth), isPositive: growth > 0 };
  };

  const lineChartSeries = [
    {
      name: "Profile Views",
      data: generateViewsData(),
    },
  ];

  const barChartSeries = [
    {
      name: "Booking Requests",
      data: generateRequestsData(),
    },
  ];

  const viewsGrowth = calculateViewsGrowth();
  const requestsGrowth = calculateRequestsGrowth();

  return (
    <div className="w-full">
      <h2 className="text-base md:text-lg font-semibold text-[#121417] mb-6">
        Engagement Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Views */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-[#121417]">Profile Views</p>
          <p className="text-xl font-bold text-[#121417] mt-1">
            {viewsGrowth.isPositive ? '+' : ''}{viewsGrowth.growth}%
          </p>
          <p className={`text-xs mb-2 ${viewsGrowth.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            Last 7 Days {viewsGrowth.isPositive ? '+' : ''}{viewsGrowth.growth}%
          </p>
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
          <p className="text-xl font-bold text-[#121417] mt-1">
            {requestsGrowth.isPositive ? '+' : '-'}{requestsGrowth.growth}%
          </p>
          <p className={`text-xs mb-2 ${requestsGrowth.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            Last 7 Days {requestsGrowth.isPositive ? '+' : '-'}{requestsGrowth.growth}%
          </p>
          <Chart
            options={barChartOptions}
            series={barChartSeries}
            type="bar"
            height={180}
          />
        </div>
      </div>
      
      {/* Additional Stats */}
      {dashboardData && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-3 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold text-[#121417]">
              {dashboardData.activeGigsCount || 0}
            </p>
            <p className="text-xs text-gray-600">Active Gigs</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold text-[#121417]">
              {dashboardData.totalRequestsCount || 0}
            </p>
            <p className="text-xs text-gray-600">Total Requests</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold text-[#121417]">
              {dashboardData.artists?.length || 0}
            </p>
            <p className="text-xs text-gray-600">Artists</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold text-[#121417]">
              {dashboardData.draftGigsCount || 0}
            </p>
            <p className="text-xs text-gray-600">Drafts</p>
          </div>
        </div>
      )}
      
      <hr className="mt-6 border-gray-200" />
    </div>
  );
};

export default EngagementOverview;