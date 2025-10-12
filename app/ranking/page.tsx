"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trophy, TrendingUp, Leaf, Award, Users, BarChart3 } from "lucide-react";

const GreenLeaderboard = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);

        const response = await axios.post(
          "https://ecoverse.namtech.me/api/tmdt/green-points/leaderboard",
          {
            jsonrpc: "2.0",
            method: "call",
            params: {
              limit: 20,
              offset: 0,
              period: "all",
            },
            id: null,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            // withCredentials: true, // nếu API cần session cookie
          }
        );
        console.log(response)
        if (response.data?.result) {
          setData(response.data.result.data);
        } else {
          setError("Không có dữ liệu trả về");
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Lỗi khi gọi API:", err);
        setError("Không thể tải dữ liệu bảng xếp hạng.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank;
  };

  const getMedalClass = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-br from-yellow-400 to-yellow-600";
    if (rank === 2) return "bg-gradient-to-br from-gray-300 to-gray-500";
    if (rank === 3) return "bg-gradient-to-br from-amber-600 to-amber-800";
    return "bg-gradient-to-br from-slate-600 to-slate-800";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Đang tải bảng xếp hạng...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Không có dữ liệu để hiển thị
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4 rounded-2xl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-12 h-12 text-emerald-600" />
            <h1 className="font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent text-4xl">
              Bảng Xếp Hạng Xanh
            </h1>
          </div>
          <p className="text-gray-600">
            Cùng nhau bảo vệ môi trường, xây dựng tương lai xanh
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<Users className="w-8 h-8 text-emerald-600" />}
            title="Tổng người dùng"
            value={data?.stats?.total_active_users || 0}
          />
          <StatCard
            icon={<TrendingUp className="w-8 h-8 text-teal-600" />}
            title="Điểm xanh trung bình"
            value={data?.stats?.avg_green_points?.toFixed(0) || 0}
          />
          <StatCard
            icon={<Leaf className="w-8 h-8 text-green-600" />}
            title="CO₂ tiết kiệm (kg)"
            value={data?.stats?.total_co2_saved?.toFixed(2) || 0}
          />
        </div>

        {/* Top 3 Podium
        {data?.top_3 && data.top_3.length >= 3 && (
          <Podium data={data.top_3} />
        )} */}


        {data?.top_3 && data.top_3.length >= 3 && (
          <div className="mb-12">
            <div className="flex items-end justify-center gap-6 max-w-4xl mx-auto">
              {/* Rank 2 */}
              <div className="flex-1 max-w-xs">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 shadow-xl border-4 border-gray-300 transform hover:scale-105 transition-transform">
                  <div className="text-center">
                    <div className=" mb-3">🥈</div>
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center  font-bold text-white shadow-lg">
                      {data.top_3[1].user.ten_user.charAt(0)}
                    </div>
                    <h3 className="font-bold  text-gray-800 mb-2">{data.top_3[1].user.ten_user}</h3>
                    <div className="inline-block px-4 py-1 rounded-full  font-semibold mb-3" style={{backgroundColor: data.top_3[1].level.color + '30', color: '#555'}}>
                      {data.top_3[1].level.name}
                    </div>
                    <div className=" font-bold text-emerald-600">{data.top_3[1].metrics.diem_xanh}</div>
                    <div className=" text-gray-500">điểm xanh</div>
                  </div>
                </div>
                <div className="h-24 bg-gradient-to-br from-gray-300 to-gray-400 rounded-b-xl mx-4"></div>
              </div>

              {/* Rank 1 */}
              <div className="flex-1 max-w-xs">
                <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl p-6 shadow-2xl border-4 border-yellow-400 transform hover:scale-105 transition-transform">
                  <div className="text-center">
                    <div className=" mb-3">🥇</div>
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center  font-bold text-white shadow-xl ring-4 ring-yellow-300">
                      {data.top_3[0].user.ten_user.charAt(0)}
                    </div>
                    <h3 className="font-bold  text-gray-800 mb-2">{data.top_3[0].user.ten_user}</h3>
                    <div className="inline-block px-4 py-1 rounded-full  font-semibold mb-3" style={{backgroundColor: data.top_3[0].level.color + '30', color: '#555'}}>
                      {data.top_3[0].level.name}
                    </div>
                    <div className=" font-bold text-emerald-600">{data.top_3[0].metrics.diem_xanh}</div>
                    <div className=" text-gray-500">điểm xanh</div>
                  </div>
                </div>
                <div className="h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-b-xl mx-4"></div>
              </div>

              {/* Rank 3 */}
              <div className="flex-1 max-w-xs">
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-6 shadow-xl border-4 border-amber-600 transform hover:scale-105 transition-transform">
                  <div className="text-center">
                    <div className=" mb-3">🥉</div>
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center  font-bold text-white shadow-lg">
                      {data.top_3[2].user.ten_user.charAt(0)}
                    </div>
                    <h3 className="font-bold  text-gray-800 mb-2">{data.top_3[2].user.ten_user}</h3>
                    <div className="inline-block px-4 py-1 rounded-full  font-semibold mb-3" style={{backgroundColor: data.top_3[2].level.color + '30', color: '#555'}}>
                      {data.top_3[2].level.name}
                    </div>
                    <div className=" font-bold text-emerald-600">{data.top_3[2].metrics.diem_xanh}</div>
                    <div className=" text-gray-500">điểm xanh</div>
                  </div>
                </div>
                <div className="h-20 bg-gradient-to-br from-amber-600 to-amber-700 rounded-b-xl mx-4"></div>
              </div>
            </div>
          </div>
        )}
        

        {/* Full Leaderboard Table */}
        <LeaderboardTable
          data={data.leaderboard}
          getMedalIcon={getMedalIcon}
          getMedalClass={getMedalClass}
        />
      </div>
    </div>
  );
};

// ---------------- COMPONENTS ----------------

const StatCard = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-emerald-100 hover:shadow-xl transition-shadow">
    <div className="flex items-center gap-4">
      <div className="bg-emerald-100 rounded-full p-4">{icon}</div>
      <div>
        <p className="text-gray-500">{title}</p>
        <p className="font-bold text-gray-800">{value}</p>
      </div>
    </div>
  </div>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Podium = ({ data }: { data: any[] }) => (
  <div className="mb-12">
    <div className="flex items-end justify-center gap-6 max-w-4xl mx-auto">
      {data.slice(0, 3).map((item, idx) => (
        <div
          key={idx}
          className="flex-1 max-w-xs bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 shadow-xl border-4 border-gray-300 text-center transform hover:scale-105 transition-transform"
        >
          <div className="mb-3">{["🥇", "🥈", "🥉"][idx]}</div>
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center font-bold text-white shadow-lg">
            {item.user.ten_user.charAt(0)}
          </div>
          <h3 className="font-bold text-gray-800 mb-2">{item.user.ten_user}</h3>
          <div
            className="inline-block px-4 py-1 rounded-full font-semibold mb-3"
            style={{
              backgroundColor: item.level.color + "30",
              color: "#555",
            }}
          >
            {item.level.name}
          </div>
          <div className="font-bold text-emerald-600">
            {item.metrics.diem_xanh}
          </div>
          <div className="text-gray-500">điểm xanh</div>
        </div>
      ))}
    </div>
  </div>
);

const LeaderboardTable = ({
  data,
  getMedalIcon,
  getMedalClass,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getMedalIcon: (rank: number) => any;
  getMedalClass: (rank: number) => string;
}) => (
  <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-emerald-100">
    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
      <h2 className="font-bold text-white flex items-center gap-2">
        <BarChart3 className="w-6 h-6" />
        Bảng Xếp Hạng Chi Tiết
      </h2>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left font-bold text-gray-700">Hạng</th>
            <th className="px-6 py-4 text-left font-bold text-gray-700">
              Người dùng
            </th>
            <th className="px-6 py-4 text-left font-bold text-gray-700">
              Cấp độ
            </th>
            <th className="px-6 py-4 text-center font-bold text-gray-700">
              Điểm xanh
            </th>
            <th className="px-6 py-4 text-center font-bold text-gray-700">
              CO₂ (kg)
            </th>
            <th className="px-6 py-4 text-center font-bold text-gray-700">
              Đơn hàng xanh
            </th>
            <th className="px-6 py-4 text-center font-bold text-gray-700">
              Tỷ lệ xanh
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data?.map((item) => (
            <tr
              key={item.user.id}
              className="hover:bg-emerald-50 transition-colors"
            >
              <td className="px-6 py-4">
                <div
                  className={`w-10 h-10 rounded-full ${getMedalClass(
                    item.rank
                  )} flex items-center justify-center text-white font-bold shadow-md`}
                >
                  {getMedalIcon(item.rank)}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold shadow-md">
                    {item.user.ten_user.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.user.ten_user}
                    </p>
                    {item.user.email_masked && (
                      <p className="text-gray-500">{item.user.email_masked}</p>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow-sm"
                  style={{
                    backgroundColor: item.level.color + "30",
                    color: "#555",
                  }}
                >
                  <Award className="w-4 h-4" />
                  {item.level.name}
                </span>
              </td>
              <td className="px-6 py-4 text-center font-bold text-emerald-600">
                {item.metrics.diem_xanh}
              </td>
              <td className="px-6 py-4 text-center font-semibold text-gray-700">
                {item.metrics.co2_tich_luy.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-center">
                <span className="font-semibold text-emerald-600">
                  {item.metrics.green_orders}
                </span>
                <span className="text-gray-400 mx-1">/</span>
                <span className="text-gray-600">
                  {item.metrics.total_orders}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="flex-1 max-w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all"
                      style={{
                        width: `${item.metrics.green_ratio}%`,
                      }}
                    ></div>
                  </div>
                  <span className="font-semibold text-gray-700 min-w-12">
                    {item.metrics.green_ratio.toFixed(0)}%
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default GreenLeaderboard;
