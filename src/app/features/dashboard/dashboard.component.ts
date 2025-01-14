import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
  ChartComponent
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

interface StatCard {
  title: string;
  value: number;
  icon: string;
  color: string;
  link: string;
  trend?: {
    value: number;
    isUp: boolean;
  };
}

interface Banner {
  id: number;
  title: string;
  imageUrl: string;
  status: 'active' | 'inactive';
  order: number;
  clicks: number;
  impressions: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild("enrollmentChart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  activeBanners: Banner[] = [
    {
      id: 1,
      title: 'Khóa học HSK 4 mới',
      imageUrl: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
      status: 'active',
      order: 1,
      clicks: 245,
      impressions: 1200
    },
    {
      id: 2,
      title: 'Giảm giá 20% khóa học',
      imageUrl: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
      status: 'active',
      order: 2,
      clicks: 180,
      impressions: 950
    },
    {
      id: 3,
      title: 'Lớp học trực tuyến',
      imageUrl: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
      status: 'active',
      order: 3,
      clicks: 156,
      impressions: 820
    }
  ];

  statCards: StatCard[] = [
    {
      title: 'Tổng số học viên',
      value: 150,
      icon: 'fa-users',
      color: '#9066cc',
      link: '/users',
      trend: {
        value: 12.5,
        isUp: true
      }
    },
    {
      title: 'Tổng số khóa học',
      value: 25,
      icon: 'fa-book',
      color: '#4CAF50',
      link: '/courses',
      trend: {
        value: 8.3,
        isUp: true
      }
    },
    {
      title: 'Tổng số giáo viên',
      value: 12,
      icon: 'fa-chalkboard-teacher',
      color: '#2196F3',
      link: '/teachers',
      trend: {
        value: 5.0,
        isUp: true
      }
    },
    {
      title: 'Đánh giá mới',
      value: 48,
      icon: 'fa-star',
      color: '#FFC107',
      link: '/reviews',
      trend: {
        value: 2.4,
        isUp: false
      }
    }
  ];

  recentReviews = [
    {
      studentName: 'Nguyễn Văn A',
      courseName: 'Tiếng Trung cơ bản',
      rating: 5,
      comment: 'Khóa học rất hay và bổ ích',
      date: '2024-01-15'
    },
    {
      studentName: 'Trần Thị B',
      courseName: 'Tiếng Trung giao tiếp',
      rating: 4,
      comment: 'Giảng viên nhiệt tình',
      date: '2024-01-14'
    },
    {
      studentName: 'Lê Văn C',
      courseName: 'HSK 4',
      rating: 5,
      comment: 'Tài liệu đầy đủ, dễ hiểu',
      date: '2024-01-13'
    }
  ];

  popularCourses = [
    {
      name: 'Tiếng Trung cơ bản',
      students: 45,
      rating: 4.8
    },
    {
      name: 'HSK 4',
      students: 38,
      rating: 4.7
    },
    {
      name: 'Tiếng Trung giao tiếp',
      students: 32,
      rating: 4.6
    }
  ];

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Số lượng đăng ký",
          data: [65, 59, 80, 81, 56, 55, 40, 45, 58, 62, 75, 85]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        toolbar: {
          show: false
        }
      },
      colors: ["#9066cc"],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        width: 3
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
      },
      markers: {
        size: 6,
        colors: ["#9066cc"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
          size: 8
        }
      },
      xaxis: {
        categories: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        title: {
          text: "Tháng"
        }
      },
      yaxis: {
        title: {
          text: "Số lượng"
        },
        min: 0,
        max: 100
      },
      legend: {
        position: "top",
        horizontalAlign: "center",
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };
  }

  ngOnInit(): void {
  }

  getStarArray(rating: number): number[] {
    return Array(rating).fill(0);
  }

  getClickRate(banner: Banner): number {
    return Math.round((banner.clicks / banner.impressions) * 100 * 10) / 10;
  }
}
