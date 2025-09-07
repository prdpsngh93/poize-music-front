'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const Analytics = () => {

    const gigCompleted = Cookies.get("gig_completed")

  const streamData = [20, 18, 22, 24, 19, 30];

  const start = streamData[0];
  const end = streamData[streamData.length - 1];
  const change = (((end - start) / start) * 100).toFixed(1);
  const isPositive = change >= 0;

  const series = [
    {
      name: 'Streams',
      data: streamData,
    },
  ];

  const options = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: 3,
      colors: ['#2563eb'], // Deep blue
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 100],
        colorStops: [
          [
            {
              offset: 0,
              color: '#60a5fa', // light blue
              opacity: 0.5,
            },
            {
              offset: 100,
              color: '#ffffff',
              opacity: 0.1,
            },
          ],
        ],
      },
    },
    xaxis: {
      categories: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          fontSize: '12px',
          colors: '#4B5563',
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
    },
    tooltip: {
      theme: 'light',
      style: {
        fontSize: '14px',
      },
    },
    markers: {
      size: 4,
      colors: ['#2563eb'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
  };

  return (
    <div className=" bg-[#f4f3ee]">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Analytics</h2>

      <div className="bg-white rounded-xl shadow-sm p-5 w-full max-w-2xl">
        <div className="mb-4">
          <h3 className="text-sm text-gray-600 font-medium">Stream Performance</h3>
          <p className="text-2xl font-bold text-gray-900">
            {isPositive ? '+' : ''}
            {change}%
          </p>
          <p className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
            Last 30 Days • {isPositive ? '+' : ''}
            {change}%
          </p>
        </div>

        <div className="h-56">
          <Chart options={options} series={series} type="area" height="100%" />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
