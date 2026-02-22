import { Camera, Clock, Edit2, MapPin, Plane, Plus, Save, ShoppingBag, Train, Trash2, Utensils, X } from "lucide-react";
import { useState } from "react";
import { INITIAL_ITINERARY } from "./data/itinerary";
import { RESTAURANT_RECOMMENDATIONS } from "./data/recommendations";
import { SHOPPING_RECOMMENDATIONS } from "./data/shopping";

export default function App() {
  const [activeTab, setActiveTab] = useState("itinerary");
  const [selectedDate, setSelectedDate] = useState("2025-03-05");
  const [itinerary, setItinerary] = useState(INITIAL_ITINERARY);
  const [isEditing, setIsEditing] = useState(null);
  const [editForm, setEditForm] = useState({});

  // --- 輔助函式 ---
  const getDayLabel = (dateStr) => {
    const d = new Date(dateStr);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const weekMap = ["日", "一", "二", "三", "四", "五", "六"];
    return `${month}/${day} (${weekMap[d.getDay()]})`;
  };

  // --- 行程操作 ---
  const handleEditClick = (item) => {
    setIsEditing(item.id);
    setEditForm(item);
  };

  const handleSaveEdit = () => {
    const updatedList = itinerary[selectedDate]
      .map((item) => (item.id === isEditing ? editForm : item))
      .sort((a, b) => a.time.localeCompare(b.time));

    setItinerary({ ...itinerary, [selectedDate]: updatedList });
    setIsEditing(null);
  };

  const handleDelete = (id) => {
    if (!window.confirm("確定要刪除這個行程嗎？")) return;
    const updatedList = itinerary[selectedDate].filter((item) => item.id !== id);
    setItinerary({ ...itinerary, [selectedDate]: updatedList });
  };

  const handleAddEvent = () => {
    const newId = Date.now();
    const newEvent = {
      id: newId,
      time: "12:00",
      endTime: "13:00",
      title: "新行程",
      location: "",
      type: "sightseeing",
      notes: "",
    };
    const updatedList = [...itinerary[selectedDate], newEvent].sort((a, b) => a.time.localeCompare(b.time));
    setItinerary({ ...itinerary, [selectedDate]: updatedList });
    setIsEditing(newId);
    setEditForm(newEvent);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "meal":
        return <Utensils size={18} className="text-orange-500" />;
      case "shopping":
        return <ShoppingBag size={18} className="text-pink-500" />;
      case "transport":
        return <Train size={18} className="text-blue-500" />;
      case "sightseeing":
        return <Camera size={18} className="text-green-500" />;
      default:
        return <MapPin size={18} className="text-gray-500" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "meal":
        return "bg-orange-50 border-orange-200";
      case "shopping":
        return "bg-pink-50 border-pink-200";
      case "transport":
        return "bg-blue-50 border-blue-200";
      case "sightseeing":
        return "bg-green-50 border-green-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen shadow-2xl overflow-hidden font-sans relative">
      {/* Header */}
      <div className="bg-indigo-600 text-white p-4 sticky top-0 z-20 shadow-md">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Plane size={20} /> 東京仙台 5日遊
          </h1>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-indigo-700 p-1 rounded-lg">
          {["itinerary", "restaurants", "shopping"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition ${
                activeTab === tab ? "bg-white text-indigo-700 shadow" : "text-indigo-200 hover:text-white"
              }`}>
              {tab === "itinerary" && "行程表"}
              {tab === "restaurants" && "找餐廳"}
              {tab === "shopping" && "逛街"}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="pb-20">
        {/* --- 行程表頁面 --- */}
        {activeTab === "itinerary" && (
          <div>
            {/* 日期選擇器 */}
            <div className="flex overflow-x-auto p-2 bg-white border-b gap-2 sticky top-[104px] z-10 no-scrollbar">
              {Object.keys(itinerary).map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ${
                    selectedDate === date
                      ? "bg-indigo-600 text-white shadow-lg transform scale-105"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}>
                  {getDayLabel(date)}
                </button>
              ))}
            </div>

            <div className="p-4 space-y-4">
              {itinerary[selectedDate].map((item) => (
                <div
                  key={item.id}
                  className={`relative p-4 rounded-xl border-l-4 shadow-sm ${getTypeColor(item.type)}`}>
                  {isEditing === item.id ? (
                    <div className="space-y-2 bg-white p-2 rounded">
                      <div className="flex gap-2">
                        <input
                          className="border p-1 rounded w-20 text-sm"
                          value={editForm.time}
                          onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                        />
                        <span className="self-center">-</span>
                        <input
                          className="border p-1 rounded w-20 text-sm"
                          value={editForm.endTime}
                          onChange={(e) => setEditForm({ ...editForm, endTime: e.target.value })}
                        />
                      </div>
                      <input
                        className="border p-1 rounded w-full font-bold"
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        placeholder="標題"
                      />
                      <input
                        className="border p-1 rounded w-full text-sm"
                        value={editForm.location}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        placeholder="地點"
                      />
                      <select
                        className="border p-1 rounded w-full text-sm"
                        value={editForm.type}
                        onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}>
                        <option value="transport">交通</option>
                        <option value="meal">用餐</option>
                        <option value="shopping">購物</option>
                        <option value="sightseeing">觀光</option>
                      </select>
                      <textarea
                        className="border p-1 rounded w-full text-sm"
                        value={editForm.notes}
                        onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                        placeholder="備註"
                        rows={2}
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        <button onClick={() => setIsEditing(null)} className="p-1 text-gray-500">
                          <X size={20} />
                        </button>
                        <button onClick={handleSaveEdit} className="p-1 text-green-600">
                          <Save size={20} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2 text-gray-500 text-sm font-mono font-semibold">
                          <Clock size={14} />
                          {item.time} - {item.endTime}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditClick(item)}
                            className="text-indigo-400 hover:text-indigo-600">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleDelete(item.id)} className="text-red-300 hover:text-red-500">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-gray-800 mt-1 flex items-center gap-2">
                        {getTypeIcon(item.type)} {item.title}
                      </h3>

                      {item.location && (
                        <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <MapPin size={14} /> {item.location}
                        </div>
                      )}

                      {item.notes && (
                        <div className="mt-2 text-sm text-gray-500 bg-white/60 p-2 rounded">{item.notes}</div>
                      )}
                    </>
                  )}
                </div>
              ))}

              <button
                onClick={handleAddEvent}
                className="w-full py-3 border-2 border-dashed border-indigo-300 text-indigo-500 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-indigo-50 transition">
                <Plus size={20} /> 新增行程
              </button>
            </div>
          </div>
        )}

        {/* --- 找餐廳頁面 --- */}
        {activeTab === "restaurants" && (
          <div className="p-4">
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 mb-6">
              <h2 className="font-bold text-orange-800 flex items-center gap-2 mb-2">
                <Utensils size={20} /> Tabelog 精選建議
              </h2>
              <p className="text-sm text-orange-700">
                以下推薦皆為 Tabelog 評分 3.5+ 或百名店，且符合預算 (¥8,000以內)。
              </p>
            </div>

            {/* 日期選擇器 (餐廳頁面) */}
            <div className="flex overflow-x-auto p-2 bg-white border-b gap-2 mb-4 no-scrollbar">
              {Object.keys(RESTAURANT_RECOMMENDATIONS).map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ${
                    selectedDate === date
                      ? "bg-orange-500 text-white shadow-lg transform scale-105"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}>
                  {getDayLabel(date)}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {RESTAURANT_RECOMMENDATIONS[selectedDate] ? (
                RESTAURANT_RECOMMENDATIONS[selectedDate].map((rest) => (
                  <div key={rest.id} className="bg-white rounded-xl shadow-sm overflow-hidden border">
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-bold text-white bg-indigo-500 px-2 py-0.5 rounded-full mb-1 inline-block">
                            {rest.area}
                          </span>
                          <h3 className="font-bold text-lg text-gray-800">{rest.name}</h3>
                          <p className="text-sm text-gray-500">{rest.type}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-yellow-500 font-bold flex items-center gap-1 justify-end">
                            ★ {rest.rating}
                          </div>
                          <div className="text-xs text-gray-400">{rest.price}</div>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">{rest.desc}</p>
                      <button
                        onClick={() => {
                          alert(`已將「${rest.name}」加入剪貼簿，請回到行程表貼上！`);
                          navigator.clipboard.writeText(`${rest.name} (${rest.type}) - ${rest.rating}`);
                          setActiveTab("itinerary");
                        }}
                        className="mt-3 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-bold transition flex items-center justify-center gap-2">
                        <Plus size={16} /> 複製店名加入行程
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-10">
                  <p>這一天尚未有推薦餐廳。</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- 逛街推薦頁面 --- */}
        {activeTab === "shopping" && (
          <div className="p-4">
            <div className="bg-pink-50 p-4 rounded-xl border border-pink-200 mb-6">
              <h2 className="font-bold text-pink-800 flex items-center gap-2 mb-2">
                <ShoppingBag size={20} /> 購物/散步地圖
              </h2>
              <p className="text-sm text-pink-700">針對你的行程安排的逛街路線與推薦店家。</p>
            </div>

            {/* 日期選擇器 (購物頁面) */}
            <div className="flex overflow-x-auto p-2 bg-white border-b gap-2 mb-4 no-scrollbar">
              {Object.keys(SHOPPING_RECOMMENDATIONS).map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ${
                    selectedDate === date
                      ? "bg-pink-500 text-white shadow-lg transform scale-105"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}>
                  {getDayLabel(date)}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {SHOPPING_RECOMMENDATIONS[selectedDate] ? (
                SHOPPING_RECOMMENDATIONS[selectedDate].map((shop) => (
                  <div key={shop.id} className="bg-white rounded-xl shadow-sm overflow-hidden border">
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-bold text-white bg-indigo-500 px-2 py-0.5 rounded-full mb-1 inline-block">
                            {shop.area}
                          </span>
                          <h3 className="font-bold text-lg text-gray-800">{shop.name}</h3>
                          <p className="text-sm text-gray-500">{shop.type}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded inline-block">
                            {shop.hours}
                          </div>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">{shop.desc}</p>

                      <button
                        onClick={() => {
                          alert(`已將「${shop.name}」加入剪貼簿，請回到行程表貼上！`);
                          navigator.clipboard.writeText(`${shop.name} (${shop.type})`);
                          setActiveTab("itinerary");
                        }}
                        className="mt-3 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-bold transition flex items-center justify-center gap-2">
                        <Plus size={16} /> 複製店名加入行程
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-10">
                  <p>這一天尚未有推薦逛街點。</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
