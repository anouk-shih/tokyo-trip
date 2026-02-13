import
  {
    Camera,
    Clock,
    Download,
    Edit2,
    MapPin,
    Plane,
    Plus,
    Save,
    Share2,
    ShoppingBag,
    Train,
    Trash2,
    Upload,
    Utensils,
    X,
  } from "lucide-react";
import { useRef, useState } from "react";

// --- 預設行程資料 ---
const INITIAL_ITINERARY = {
  "2025-03-05": [
    {
      id: 1,
      time: "12:30",
      endTime: "13:30",
      title: "抵達成田機場",
      location: "成田機場",
      type: "transport",
      notes: "入境、領行李，抓 60-90 分鐘緩衝",
    },
    {
      id: 2,
      time: "13:30",
      endTime: "15:00",
      title: "移動：成田 → 飯店",
      location: "成田特快 N'EX → 東京站 → 森下/両國",
      type: "transport",
      notes: "放置行李",
    },
    {
      id: 3,
      time: "15:30",
      endTime: "17:30",
      title: "Pokémon Center TOKYO DX",
      location: "日本橋高島屋 S.C. 東館 5F",
      type: "shopping",
      notes: "逛周邊、買點心",
    },
    {
      id: 4,
      time: "17:30",
      endTime: "18:30",
      title: "晚餐：日本橋和食/居酒屋",
      location: "日本橋周邊",
      type: "meal",
      notes: "建議找 Tabelog 3.5 以上店家",
    },
    {
      id: 5,
      time: "18:30",
      endTime: "20:30",
      title: "銀座逛街",
      location: "UNIQLO TOKYO / 銀座店",
      type: "shopping",
      notes: "Asics walking、衣服鞋子採買",
    },
    {
      id: 6,
      time: "20:30",
      endTime: "21:00",
      title: "返回飯店",
      location: "森下/両國",
      type: "transport",
      notes: "休息",
    },
  ],
  "2025-03-06": [
    {
      id: 7,
      time: "09:00",
      endTime: "09:30",
      title: "前往秋葉原",
      location: "總武線/都營地鐵",
      type: "transport",
      notes: "",
    },
    {
      id: 8,
      time: "09:30",
      endTime: "11:30",
      title: "電器採購",
      location: "Yodobashi Akiba / Bic Camera",
      type: "shopping",
      notes: "看美容儀、按摩器、握力器",
    },
    {
      id: 9,
      time: "11:30",
      endTime: "12:30",
      title: "午餐：拉麵或定食",
      location: "秋葉原",
      type: "meal",
      notes: "Tabelog 3.5↑",
    },
    {
      id: 10,
      time: "13:00",
      endTime: "15:00",
      title: "野球殿堂博物館",
      location: "東京巨蛋內",
      type: "sightseeing",
      notes: "預留 1.5-2 小時",
    },
    {
      id: 11,
      time: "15:00",
      endTime: "16:30",
      title: "東京巨蛋城散步",
      location: "LaQua",
      type: "sightseeing",
      notes: "咖啡、甜點",
    },
    {
      id: 12,
      time: "18:00",
      endTime: "21:00",
      title: "看轉播 + 晚餐",
      location: "巨蛋周邊或市中心",
      type: "meal",
      notes: "找個有好氣氛的居酒屋",
    },
  ],
  "2025-03-07": [
    {
      id: 13,
      time: "07:30",
      endTime: "09:00",
      title: "移動：東京 → 日光",
      location: "新幹線+JR日光線",
      type: "transport",
      notes: "從上野/東京出發",
    },
    {
      id: 14,
      time: "09:00",
      endTime: "12:00",
      title: "世界遺產散步",
      location: "東照宮、輪王寺、二荒山神社",
      type: "sightseeing",
      notes: "多走路，注意鞋子舒適度",
    },
    {
      id: 15,
      time: "12:00",
      endTime: "13:00",
      title: "午餐：蕎麥麵/和食",
      location: "日光東照宮周邊",
      type: "meal",
      notes: "Tabelog 3.5↑",
    },
    {
      id: 16,
      time: "13:00",
      endTime: "16:00",
      title: "中禪寺湖 + 華嚴瀑布",
      location: "奧日光",
      type: "sightseeing",
      notes: "視體力與天氣決定",
    },
    {
      id: 17,
      time: "19:00",
      endTime: "20:30",
      title: "晚餐：升級大餐",
      location: "東京站/銀座",
      type: "meal",
      notes: "預算 8000 日圓內的百名店 (壽司/和食)",
    },
  ],
  "2025-03-08": [
    {
      id: 18,
      time: "10:00",
      endTime: "11:30",
      title: "Workman 女子",
      location: "錦糸町 (Arkhakit 3F)",
      type: "shopping",
      notes: "機能服、外套",
    },
    {
      id: 19,
      time: "12:00",
      endTime: "13:00",
      title: "午餐：洋食/甜點",
      location: "自由之丘",
      type: "meal",
      notes: "這裡有很多百名店甜點",
    },
    {
      id: 20,
      time: "13:00",
      endTime: "15:00",
      title: "ALPHAICON TOKYO",
      location: "自由之丘",
      type: "shopping",
      notes: "狗狗機能服 (32kg)",
    },
    {
      id: 21,
      time: "16:30",
      endTime: "18:30",
      title: "Mont-bell + 電器補貨",
      location: "新宿",
      type: "shopping",
      notes: "最後採買",
    },
    {
      id: 22,
      time: "18:30",
      endTime: "20:30",
      title: "晚餐：和牛壽喜燒/居酒屋",
      location: "新宿",
      type: "meal",
      notes: "預算 5000-8000 日圓",
    },
  ],
  "2025-03-09": [
    {
      id: 23,
      time: "10:00",
      endTime: "11:30",
      title: "移動：東京 → 仙台",
      location: "東北新幹線",
      type: "transport",
      notes: "約 1.5 小時，記得預約指定席",
    },
    {
      id: 24,
      time: "11:30",
      endTime: "15:00",
      title: "仙台午餐與會合",
      location: "仙台站周邊",
      type: "meal",
      notes: "牛舌？",
    },
    {
      id: 25,
      time: "15:30",
      endTime: "16:00",
      title: "前往機場",
      location: "仙台機場鐵道",
      type: "transport",
      notes: "約 25 分鐘",
    },
    {
      id: 26,
      time: "17:25",
      endTime: "17:25",
      title: "飛機起飛",
      location: "仙台機場",
      type: "transport",
      notes: "回家",
    },
  ],
};

// --- Tabelog 推薦資料 ---
const RESTAURANT_RECOMMENDATIONS = [
  {
    id: 101,
    name: "銀座 篝 (Kagari)",
    type: "拉麵 (雞白湯)",
    area: "銀座",
    rating: "3.78 (百名店)",
    price: "¥1,500-¥2,000",
    desc: "非常著名的雞白湯拉麵，適合午餐或簡便晚餐。",
  },
  {
    id: 102,
    name: "梅邱壽司之美登利 總本店",
    type: "壽司",
    area: "銀座/澀谷",
    rating: "3.55 (人氣店)",
    price: "¥3,000-¥5,000",
    desc: "CP值極高的壽司，排隊名店，但品質對得起價格。",
  },
  {
    id: 103,
    name: "天婦羅 阿部 (Tempura Abe)",
    type: "天婦羅",
    area: "銀座",
    rating: "3.68 (百名店)",
    price: "¥4,000-¥6,000",
    desc: "午餐極划算，晚餐也在預算內的精緻天婦羅。",
  },
  {
    id: 104,
    name: "Isen (井泉) 本店",
    type: "炸豬排",
    area: "上野/湯島",
    rating: "3.75 (百名店)",
    price: "¥2,000-¥3,000",
    desc: "筷子就能切斷的柔軟炸豬排，歷史悠久。",
  },
  {
    id: 105,
    name: "Mont St. Clair",
    type: "甜點",
    area: "自由之丘",
    rating: "3.85 (百名店)",
    price: "¥1,000-¥2,000",
    desc: "大師辻口博啓的店，自由之丘必訪。",
  },
  {
    id: 106,
    name: "Imahan (今半) 萬窯",
    type: "壽喜燒",
    area: "新宿",
    rating: "3.60",
    price: "¥6,000-¥10,000",
    desc: "午餐時段可以吃到頂級壽喜燒，晚餐稍貴但若點少一點可在預算內。",
  },
  {
    id: 107,
    name: "Tsujihan (辻半)",
    type: "海鮮丼",
    area: "日本橋",
    rating: "3.75 (百名店)",
    price: "¥1,500-¥3,000",
    desc: "極致奢華的海鮮珠寶盒丼飯，日本橋排隊名店。",
  },
];

const PAYERS = ["安安", "阿弟", "爸爸", "媽媽", "公費"];

export default function App() {
  const [activeTab, setActiveTab] = useState("itinerary");
  const [selectedDate, setSelectedDate] = useState("2025-03-05");
  const [itinerary, setItinerary] = useState(INITIAL_ITINERARY);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ item: "", cost: "", currency: "JPY", payer: "安安" });
  const [isEditing, setIsEditing] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showShareModal, setShowShareModal] = useState(false);
  const [importCode, setImportCode] = useState("");
  const fileInputRef = useRef(null);

  // --- 輔助函式 ---
  const getDayLabel = (dateStr) => {
    const d = new Date(dateStr);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const weekMap = ["日", "一", "二", "三", "四", "五", "六"];
    return `${month}/${day} (${weekMap[d.getDay()]})`;
  };

  const calculateTotal = (currency) => {
    return expenses.filter((e) => e.currency === currency).reduce((sum, e) => sum + parseFloat(e.cost || 0), 0);
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

  // --- 記帳操作 ---
  const addExpense = (e) => {
    e.preventDefault();
    if (!newExpense.item || !newExpense.cost) return;
    setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
    setNewExpense({ item: "", cost: "", currency: "JPY", payer: "安安" });
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  // --- 匯入/匯出 ---
  const getExportData = () => {
    return JSON.stringify({ itinerary, expenses }, null, 2);
  };

  const handleDownloadTxt = () => {
    const data = getExportData();
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `東京行_備份_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.itinerary) setItinerary(data.itinerary);
        if (data.expenses) setExpenses(data.expenses);
        alert("檔案匯入成功！");
        setShowShareModal(false);
      } catch (err) {
        alert("檔案格式錯誤，請確認是否為正確的備份檔。");
      }
    };
    reader.readAsText(file);
  };

  const handleImportText = () => {
    try {
      const data = JSON.parse(importCode);
      if (data.itinerary) setItinerary(data.itinerary);
      if (data.expenses) setExpenses(data.expenses);
      alert("行程匯入成功！");
      setShowShareModal(false);
      setImportCode("");
    } catch (e) {
      alert("代碼格式錯誤。");
    }
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
          <button
            onClick={() => setShowShareModal(true)}
            className="p-2 bg-indigo-500 rounded-full hover:bg-indigo-400 transition">
            <Share2 size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-indigo-700 p-1 rounded-lg">
          {["itinerary", "expenses", "restaurants"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition ${
                activeTab === tab ? "bg-white text-indigo-700 shadow" : "text-indigo-200 hover:text-white"
              }`}>
              {tab === "itinerary" && "行程表"}
              {tab === "expenses" && "記帳本"}
              {tab === "restaurants" && "找餐廳"}
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

        {/* --- 記帳頁面 --- */}
        {activeTab === "expenses" && (
          <div className="p-4">
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border">
              <h2 className="text-gray-500 text-sm font-bold uppercase tracking-wide">目前總花費</h2>
              <div className="mt-2 flex gap-4">
                <div>
                  <span className="text-3xl font-bold text-gray-800">¥{calculateTotal("JPY").toLocaleString()}</span>
                  <p className="text-xs text-gray-400">日幣總計</p>
                </div>
                <div className="border-l pl-4">
                  <span className="text-3xl font-bold text-gray-800">${calculateTotal("TWD").toLocaleString()}</span>
                  <p className="text-xs text-gray-400">台幣總計</p>
                </div>
              </div>
            </div>

            <form onSubmit={addExpense} className="bg-white p-4 rounded-xl shadow-sm border mb-6 space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="項目 (例: 晚餐)"
                  className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={newExpense.item}
                  onChange={(e) => setNewExpense({ ...newExpense, item: e.target.value })}
                />
                <select
                  className="p-2 border rounded-lg bg-gray-50 text-sm"
                  value={newExpense.payer}
                  onChange={(e) => setNewExpense({ ...newExpense, payer: e.target.value })}>
                  {PAYERS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="number"
                    placeholder="金額"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={newExpense.cost}
                    onChange={(e) => setNewExpense({ ...newExpense, cost: e.target.value })}
                  />
                </div>
                <select
                  className="p-2 border rounded-lg bg-gray-50 font-bold"
                  value={newExpense.currency}
                  onChange={(e) => setNewExpense({ ...newExpense, currency: e.target.value })}>
                  <option value="JPY">JPY</option>
                  <option value="TWD">TWD</option>
                </select>
              </div>
              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700">
                新增支出
              </button>
            </form>

            <div className="space-y-2">
              <h3 className="font-bold text-gray-700 mb-2">支出明細</h3>
              {expenses.length === 0 && <p className="text-gray-400 text-center py-4">目前沒有記錄</p>}
              {expenses
                .slice()
                .reverse()
                .map((e) => (
                  <div
                    key={e.id}
                    className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border-l-4 border-indigo-400">
                    <div>
                      <p className="font-bold text-gray-800">{e.item}</p>
                      <p className="text-xs text-gray-500">
                        {e.payer} • {new Date(e.id).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-indigo-600">
                        {e.currency === "JPY" ? "¥" : "$"}
                        {parseFloat(e.cost).toLocaleString()}
                      </span>
                      <button onClick={() => deleteExpense(e.id)} className="text-gray-300 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
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

            <div className="space-y-4">
              {RESTAURANT_RECOMMENDATIONS.map((rest) => (
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
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">分享與同步</h3>
              <button onClick={() => setShowShareModal(false)}>
                <X size={24} className="text-gray-400" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">1. 匯出設定 (傳給家人)</label>
                <button
                  onClick={handleDownloadTxt}
                  className="w-full py-3 bg-indigo-100 text-indigo-700 rounded-lg font-bold flex items-center justify-center gap-2 mb-2 hover:bg-indigo-200 transition">
                  <Download size={18} /> 下載設定檔 (.txt)
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(getExportData());
                    alert("行程代碼已複製！");
                  }}
                  className="w-full py-2 border border-indigo-200 text-indigo-500 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-indigo-50">
                  <Share2 size={14} /> 或 複製純文字代碼
                </button>
              </div>

              <div className="border-t pt-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">2. 匯入設定 (家人使用)</label>
                <div className="flex gap-2">
                  <input type="file" accept=".txt" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="w-full py-3 bg-gray-800 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-gray-700 transition">
                    <Upload size={18} /> 上傳設定檔 (.txt)
                  </button>
                </div>

                {/* 保留文字框匯入作為備用方案 */}
                <details className="mt-4">
                  <summary className="text-xs text-gray-400 cursor-pointer">或貼上代碼匯入</summary>
                  <div className="mt-2">
                    <textarea
                      value={importCode}
                      onChange={(e) => setImportCode(e.target.value)}
                      className="w-full border rounded-lg p-2 text-xs font-mono h-24 mb-2"
                      placeholder="若無法上傳檔案，請貼上代碼..."></textarea>
                    <button
                      onClick={handleImportText}
                      className="w-full py-2 bg-gray-200 text-gray-700 rounded-lg font-bold text-xs">
                      讀取代碼
                    </button>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
