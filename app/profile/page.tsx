"use client"
import React, { useState, useEffect } from 'react';
import { User, Award, TrendingUp, Leaf, ShoppingBag, Calendar, ChevronRight, Trophy, Star } from 'lucide-react';

interface LevelInfo {
  current_level?: {
    color?: string;
    level?: string;
    min_points?: number;
    max_points?: number;
  };
  next_level?: {
    level?: string;
  };
  progress_to_next?: {
    current: number;
    required: number;
    remaining: number;
  };
}

interface GreenMetrics {
  diem_xanh?: number;
  co2_tich_luy?: number;
  xep_hang?: number;
  tong_so_nguoi?: number;
}

interface UserInfo {
  ten_user?: string;
  email?: string;
  ngay_dang_ky?: string;
}

interface Activity {
  mo_ta: string;
  ngay: string;
  co2_tiet_kiem: number;
  diem_xanh: number;
}

interface Statistics {
  total_orders?: number;
  green_orders?: number;
}

interface GreenPointsData {
  level_info?: LevelInfo;
  green_metrics?: GreenMetrics;
  user_info?: UserInfo;
  recent_activities?: Activity[];
  statistics?: Statistics;
}

interface ProfileData {
  ten_user?: string;
  email?: string;
  ngay_dang_ky?: string;
}

const GreenEcommerceProfile = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [greenPointsData, setGreenPointsData] = useState<GreenPointsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      
      // Fetch basic profile
      const profileRes = await fetch('https://ecoverse.namtech.me/api/tmdt/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': 'session_id=8aHB8dt2KQNqz5AIOwsM5ytj-PjdXKpL10dxbi99vODDl_eH6dpK9cJFgHvizj6VJhitnboKWMVpgizCjgCt'
        },
        // credentials: 'include'
      });
      
      
      const profileJson = await profileRes.json();
      console.log("profile res: "  , profileJson)
      // Fetch green points profile
      const greenPointsRes = await fetch('https://ecoverse.namtech.me/api/tmdt/green-points/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': 'session_id=8aHB8dt2KQNqz5AIOwsM5ytj-PjdXKpL10dxbi99vODDl_eH6dpK9cJFgHvizj6VJhitnboKWMVpgizCjgCt'
        },
        // credentials: 'include'
      });
      
      const greenPointsJson = await greenPointsRes.json();
      console.log("diem xanh res :" , greenPointsJson)
      if (profileJson.result?.success) {
        setProfileData(profileJson.result.data);
      }
      
      if (greenPointsJson.result?.success) {
        setGreenPointsData(greenPointsJson.result.data);
      }
      
      setError(null);
    } catch (err) {
      setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string | number | Date) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatNumber = (num:number) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  const getLevelColor = (color?: string) => {
    return color || '#4ade80';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent"></div>
          <p className="mt-4 text-green-700 font-medium">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Lỗi tải dữ liệu</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={fetchProfileData}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  const levelInfo = greenPointsData?.level_info;
  const greenMetrics = greenPointsData?.green_metrics;
  const userInfo = greenPointsData?.user_info || profileData;
  const activities = greenPointsData?.recent_activities || [];
  const stats = greenPointsData?.statistics;

  const progressPercentage = levelInfo?.progress_to_next 
    ? (levelInfo.progress_to_next.current / levelInfo.progress_to_next.required) * 100 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div 
            className="h-32 md:h-40 relative"
            style={{
              background: `linear-gradient(135deg, ${getLevelColor(levelInfo?.current_level?.color)} 0%, #10b981 100%)`
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          </div>
          
          <div className="px-6 md:px-10 pb-8 relative">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 md:-mt-20">
              <div className="flex flex-col md:flex-row md:items-end gap-4">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-3xl shadow-xl flex items-center justify-center border-4 border-white">
                  <User className="w-12 h-12 md:w-16 md:h-16 text-green-600" />
                </div>
                
                <div className="mb-4 md:mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    {userInfo?.ten_user}
                  </h1>
                  <p className="text-gray-500 mt-1">{userInfo?.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      Tham gia: {userInfo?.ngay_dang_ky ? formatDate(userInfo.ngay_dang_ky) : ''}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl shadow-lg">
                  <div className="text-sm opacity-90">Điểm xanh</div>
                  <div className="text-2xl font-bold">{formatNumber(greenMetrics?.diem_xanh || 0)}</div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-2xl shadow-lg">
                  <div className="text-sm opacity-90">CO₂ tiết kiệm</div>
                  <div className="text-2xl font-bold">{greenMetrics?.co2_tich_luy || 0} kg</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Level Progress Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Cấp độ thành viên</h2>
                  <p className="text-gray-500">Nâng cấp để nhận nhiều ưu đãi hơn</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: getLevelColor(levelInfo?.current_level?.color) }}
                    >
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">
                        {levelInfo?.current_level?.level}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatNumber(levelInfo?.current_level?.min_points ?? 0)} - {formatNumber(levelInfo?.current_level?.max_points ?? 0)} điểm
                      </div>
                    </div>
                  </div>
                  
                  {levelInfo?.next_level && (
                    <ChevronRight className="w-8 h-8 text-gray-400" />
                  )}
                </div>

                {levelInfo?.next_level && (
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Tiến độ đến cấp tiếp theo</span>
                      <span className="font-bold text-green-600">
                        {formatNumber(levelInfo?.progress_to_next?.current ?? 0)} / {formatNumber(levelInfo?.progress_to_next?.required ?? 0)}
                      </span>
                    </div>
                    
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      ></div>
                    </div>
                    
                    <div className="mt-3 flex items-center gap-2 text-sm">
                      <Leaf className="w-4 h-4 text-green-600" />
                      <span className="text-gray-600">
                        Còn <span className="font-bold text-green-600">{formatNumber(levelInfo?.progress_to_next?.remaining ?? 0)}</span> điểm đến <span className="font-bold">{levelInfo?.next_level?.level}</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Hoạt động gần đây</h2>
                  <p className="text-gray-500">{activities.length} giao dịch</p>
                </div>
              </div>

              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl hover:shadow-md transition-shadow border border-gray-100"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{activity.mo_ta}</div>
                        <div className="text-sm text-gray-500">{formatDate(activity.ngay)}</div>
                        {activity.co2_tiet_kiem > 0 && (
                          <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                            <Leaf className="w-3 h-3" />
                            Tiết kiệm {activity.co2_tiet_kiem} kg CO₂
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        +{formatNumber(activity.diem_xanh)}
                      </div>
                      <div className="text-xs text-gray-500">điểm xanh</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-8">
            {/* Ranking Card */}
            <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl shadow-xl p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-10 h-10" />
                <h2 className="text-2xl font-bold">Xếp hạng</h2>
              </div>
              
              <div className="text-center">
                <div className="text-7xl font-black mb-2">#{greenMetrics?.xep_hang}</div>
                <div className="text-xl opacity-90">
                  Trong {formatNumber(greenMetrics?.tong_so_nguoi ?? 0)} thành viên
                </div>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Thống kê</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tổng đơn hàng</span>
                    <span className="text-3xl font-bold text-blue-600">
                      {stats?.total_orders || 0}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Đơn hàng xanh</span>
                    <span className="text-3xl font-bold text-green-600">
                      {stats?.green_orders || 0}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tỷ lệ xanh</span>
                    <span className="text-3xl font-bold text-purple-600">
                      {stats?.total_orders ? Math.round(((stats.green_orders ?? 0) / stats.total_orders) * 100) : 0}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact Card */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl shadow-xl p-8 text-white">
              <Leaf className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Tác động môi trường</h3>
              <p className="opacity-90 mb-4">
                Bạn đã góp phần bảo vệ môi trường bằng cách mua sắm xanh!
              </p>
              <div className="bg-white bg-opacity-20 rounded-xl p-4">
                <div className="text-sm opacity-90 mb-1">Tương đương với</div>
                <div className="text-2xl font-bold">
                  {Math.round((greenMetrics?.co2_tich_luy || 0) * 20)} cây xanh
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreenEcommerceProfile;