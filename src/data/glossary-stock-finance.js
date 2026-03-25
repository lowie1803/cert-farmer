/**
 * Stock & Finance Glossary - Vietnamese Definitions
 *
 * Format:
 * "English Term": {
 *   vi: "Vietnamese explanation",
 *   category: "Category name"
 * }
 *
 * Categories: Market Basics, Trading, Financial Statements, Ratios & Metrics,
 *             Investment Vehicles, Technical Analysis, Risk & Strategy, Corporate Actions
 */

const glossary = {
  // === MARKET BASICS ===
  "Stock": {
    vi: "Cổ phiếu — chứng khoán đại diện quyền sở hữu một phần công ty",
    category: "Market Basics"
  },
  "Share": {
    vi: "Cổ phần — đơn vị sở hữu nhỏ nhất trong một công ty",
    category: "Market Basics"
  },
  "Stock Exchange": {
    vi: "Sàn giao dịch chứng khoán — nơi mua bán cổ phiếu tập trung",
    category: "Market Basics"
  },
  "IPO": {
    vi: "Initial Public Offering — phát hành cổ phiếu lần đầu ra công chúng",
    category: "Market Basics"
  },
  "Bull Market": {
    vi: "Thị trường tăng giá — xu hướng giá tăng kéo dài, nhà đầu tư lạc quan",
    category: "Market Basics"
  },
  "Bear Market": {
    vi: "Thị trường giảm giá — xu hướng giá giảm kéo dài, nhà đầu tư bi quan",
    category: "Market Basics"
  },
  "Market Cap": {
    vi: "Vốn hóa thị trường — tổng giá trị cổ phiếu đang lưu hành (giá × số lượng)",
    category: "Market Basics"
  },
  "Liquidity": {
    vi: "Thanh khoản — khả năng mua/bán tài sản nhanh chóng mà không ảnh hưởng giá",
    category: "Market Basics"
  },
  "Ticker Symbol": {
    vi: "Mã chứng khoán — ký hiệu viết tắt đại diện cổ phiếu trên sàn (VD: VNM, FPT)",
    category: "Market Basics"
  },
  "Blue Chip": {
    vi: "Cổ phiếu blue-chip — cổ phiếu của công ty lớn, uy tín, tài chính vững mạnh",
    category: "Market Basics"
  },
  "VN-Index": {
    vi: "Chỉ số chứng khoán chính của sàn HOSE, phản ánh xu hướng thị trường Việt Nam",
    category: "Market Basics"
  },
  "HOSE": {
    vi: "Sở Giao dịch Chứng khoán TP. Hồ Chí Minh — sàn giao dịch lớn nhất Việt Nam",
    category: "Market Basics"
  },
  "HNX": {
    vi: "Sở Giao dịch Chứng khoán Hà Nội — sàn giao dịch thứ hai tại Việt Nam",
    category: "Market Basics"
  },
  "Secondary Market": {
    vi: "Thị trường thứ cấp — nơi nhà đầu tư mua bán chứng khoán đã phát hành",
    category: "Market Basics"
  },
  "Trading Volume": {
    vi: "Khối lượng giao dịch — tổng số cổ phiếu được mua bán trong một phiên",
    category: "Market Basics"
  },

  // === TRADING ===
  "Bid": {
    vi: "Giá mua — mức giá cao nhất người mua sẵn sàng trả",
    category: "Trading"
  },
  "Ask": {
    vi: "Giá bán — mức giá thấp nhất người bán sẵn sàng chấp nhận",
    category: "Trading"
  },
  "Spread": {
    vi: "Chênh lệch giá — khoảng cách giữa giá mua (bid) và giá bán (ask)",
    category: "Trading"
  },
  "Market Order": {
    vi: "Lệnh thị trường — lệnh mua/bán ngay tại giá thị trường hiện tại",
    category: "Trading"
  },
  "Limit Order": {
    vi: "Lệnh giới hạn — lệnh mua/bán tại mức giá chỉ định hoặc tốt hơn",
    category: "Trading"
  },
  "Stop-Loss Order": {
    vi: "Lệnh cắt lỗ — tự động bán khi giá giảm đến mức đặt trước để hạn chế thua lỗ",
    category: "Trading"
  },
  "Margin Trading": {
    vi: "Giao dịch ký quỹ — vay tiền từ công ty chứng khoán để mua cổ phiếu",
    category: "Trading"
  },
  "Margin Call": {
    vi: "Lệnh gọi ký quỹ — yêu cầu bổ sung tiền khi tài khoản giảm dưới mức tối thiểu",
    category: "Trading"
  },
  "Short Selling": {
    vi: "Bán khống — bán cổ phiếu đi mượn với kỳ vọng giá giảm, mua lại rẻ hơn",
    category: "Trading"
  },
  "Take Profit": {
    vi: "Chốt lời — bán cổ phiếu khi đạt mức lãi mong muốn",
    category: "Trading"
  },
  "Lot": {
    vi: "Lô — đơn vị giao dịch tối thiểu (1 lô = 100 cổ phiếu trên HOSE)",
    category: "Trading"
  },
  "Trading Session": {
    vi: "Phiên giao dịch — thời gian sàn mở cửa cho mua bán chứng khoán",
    category: "Trading"
  },
  "ATC Order": {
    vi: "Lệnh ATC — lệnh khớp tại giá đóng cửa cuối phiên giao dịch",
    category: "Trading"
  },
  "ATO Order": {
    vi: "Lệnh ATO — lệnh khớp tại giá mở cửa đầu phiên giao dịch",
    category: "Trading"
  },
  "T+2 Settlement": {
    vi: "Thanh toán T+2 — giao dịch hoàn tất sau 2 ngày làm việc kể từ ngày khớp lệnh",
    category: "Trading"
  },

  // === FINANCIAL STATEMENTS ===
  "Revenue": {
    vi: "Doanh thu — tổng thu nhập từ hoạt động kinh doanh chính",
    category: "Financial Statements"
  },
  "Net Income": {
    vi: "Lợi nhuận ròng — lãi còn lại sau khi trừ tất cả chi phí và thuế",
    category: "Financial Statements"
  },
  "Gross Profit": {
    vi: "Lợi nhuận gộp — doanh thu trừ giá vốn hàng bán",
    category: "Financial Statements"
  },
  "Operating Income": {
    vi: "Lợi nhuận hoạt động — lãi từ hoạt động kinh doanh chính (chưa tính lãi vay, thuế)",
    category: "Financial Statements"
  },
  "COGS": {
    vi: "Cost of Goods Sold — giá vốn hàng bán, chi phí trực tiếp sản xuất sản phẩm",
    category: "Financial Statements"
  },
  "EBITDA": {
    vi: "Lợi nhuận trước lãi vay, thuế, khấu hao — đo lường hiệu quả hoạt động",
    category: "Financial Statements"
  },
  "Balance Sheet": {
    vi: "Bảng cân đối kế toán — báo cáo tài sản, nợ phải trả và vốn chủ sở hữu",
    category: "Financial Statements"
  },
  "Income Statement": {
    vi: "Báo cáo kết quả kinh doanh — thể hiện doanh thu, chi phí và lợi nhuận",
    category: "Financial Statements"
  },
  "Cash Flow Statement": {
    vi: "Báo cáo lưu chuyển tiền tệ — theo dõi dòng tiền vào/ra của doanh nghiệp",
    category: "Financial Statements"
  },
  "Assets": {
    vi: "Tài sản — những gì công ty sở hữu có giá trị kinh tế",
    category: "Financial Statements"
  },
  "Liabilities": {
    vi: "Nợ phải trả — các nghĩa vụ tài chính công ty phải thanh toán",
    category: "Financial Statements"
  },
  "Equity": {
    vi: "Vốn chủ sở hữu — giá trị tài sản ròng (tài sản trừ nợ phải trả)",
    category: "Financial Statements"
  },
  "Retained Earnings": {
    vi: "Lợi nhuận giữ lại — phần lãi không chia cổ tức, tái đầu tư vào công ty",
    category: "Financial Statements"
  },
  "Depreciation": {
    vi: "Khấu hao tài sản hữu hình — phân bổ chi phí tài sản cố định theo thời gian",
    category: "Financial Statements"
  },
  "Amortization": {
    vi: "Khấu hao tài sản vô hình — phân bổ chi phí tài sản vô hình (bằng sáng chế, thương hiệu)",
    category: "Financial Statements"
  },

  // === RATIOS & METRICS ===
  "P/E Ratio": {
    vi: "Tỷ số giá/lợi nhuận — giá cổ phiếu chia cho EPS, đo mức độ đắt/rẻ",
    category: "Ratios & Metrics"
  },
  "EPS": {
    vi: "Earnings Per Share — lợi nhuận trên mỗi cổ phiếu",
    category: "Ratios & Metrics"
  },
  "P/B Ratio": {
    vi: "Tỷ số giá/giá trị sổ sách — so sánh giá thị trường với giá trị kế toán",
    category: "Ratios & Metrics"
  },
  "ROE": {
    vi: "Return on Equity — tỷ suất lợi nhuận trên vốn chủ sở hữu",
    category: "Ratios & Metrics"
  },
  "ROA": {
    vi: "Return on Assets — tỷ suất lợi nhuận trên tổng tài sản",
    category: "Ratios & Metrics"
  },
  "Debt-to-Equity Ratio": {
    vi: "Tỷ số nợ/vốn chủ sở hữu — đo mức độ sử dụng đòn bẩy tài chính",
    category: "Ratios & Metrics"
  },
  "Current Ratio": {
    vi: "Tỷ số thanh toán hiện hành — tài sản ngắn hạn chia nợ ngắn hạn",
    category: "Ratios & Metrics"
  },
  "Dividend Yield": {
    vi: "Tỷ suất cổ tức — cổ tức hàng năm chia cho giá cổ phiếu (%)",
    category: "Ratios & Metrics"
  },
  "Profit Margin": {
    vi: "Biên lợi nhuận — tỷ lệ lợi nhuận ròng trên doanh thu",
    category: "Ratios & Metrics"
  },
  "Gross Margin": {
    vi: "Biên lợi nhuận gộp — tỷ lệ lợi nhuận gộp trên doanh thu",
    category: "Ratios & Metrics"
  },
  "Book Value": {
    vi: "Giá trị sổ sách — giá trị tài sản ròng trên mỗi cổ phiếu theo kế toán",
    category: "Ratios & Metrics"
  },
  "Price-to-Sales Ratio": {
    vi: "Tỷ số giá/doanh thu — vốn hóa chia cho tổng doanh thu",
    category: "Ratios & Metrics"
  },
  "Free Cash Flow": {
    vi: "Dòng tiền tự do — tiền mặt còn lại sau chi phí vận hành và đầu tư",
    category: "Ratios & Metrics"
  },
  "Quick Ratio": {
    vi: "Tỷ số thanh toán nhanh — (tài sản ngắn hạn − hàng tồn kho) / nợ ngắn hạn",
    category: "Ratios & Metrics"
  },
  "Operating Margin": {
    vi: "Biên lợi nhuận hoạt động — lợi nhuận hoạt động chia doanh thu",
    category: "Ratios & Metrics"
  },

  // === INVESTMENT VEHICLES ===
  "Bond": {
    vi: "Trái phiếu — chứng khoán nợ, người mua cho vay và nhận lãi định kỳ",
    category: "Investment Vehicles"
  },
  "Mutual Fund": {
    vi: "Quỹ tương hỗ — quỹ gom tiền nhiều nhà đầu tư để đầu tư đa dạng",
    category: "Investment Vehicles"
  },
  "ETF": {
    vi: "Exchange-Traded Fund — quỹ hoán đổi danh mục, giao dịch như cổ phiếu trên sàn",
    category: "Investment Vehicles"
  },
  "Index Fund": {
    vi: "Quỹ chỉ số — quỹ đầu tư theo dõi một chỉ số thị trường (VD: VN30)",
    category: "Investment Vehicles"
  },
  "Common Stock": {
    vi: "Cổ phiếu phổ thông — cổ phiếu có quyền biểu quyết và nhận cổ tức",
    category: "Investment Vehicles"
  },
  "Preferred Stock": {
    vi: "Cổ phiếu ưu đãi — được ưu tiên nhận cổ tức nhưng thường không có quyền biểu quyết",
    category: "Investment Vehicles"
  },
  "Derivative": {
    vi: "Chứng khoán phái sinh — hợp đồng tài chính có giá trị dựa trên tài sản cơ sở",
    category: "Investment Vehicles"
  },
  "Futures Contract": {
    vi: "Hợp đồng tương lai — thỏa thuận mua/bán tài sản tại ngày và giá xác định",
    category: "Investment Vehicles"
  },
  "Options Contract": {
    vi: "Hợp đồng quyền chọn — quyền (không nghĩa vụ) mua/bán tài sản tại giá chỉ định",
    category: "Investment Vehicles"
  },
  "Warrant": {
    vi: "Chứng quyền — quyền mua cổ phiếu của công ty tại giá ấn định trong tương lai",
    category: "Investment Vehicles"
  },
  "Treasury Bond": {
    vi: "Trái phiếu chính phủ — trái phiếu do nhà nước phát hành, rủi ro thấp",
    category: "Investment Vehicles"
  },
  "Certificate of Deposit": {
    vi: "Chứng chỉ tiền gửi — sản phẩm tiết kiệm có kỳ hạn với lãi suất cố định",
    category: "Investment Vehicles"
  },

  // === TECHNICAL ANALYSIS ===
  "Candlestick": {
    vi: "Nến Nhật — biểu đồ thể hiện giá mở/đóng/cao/thấp trong một phiên",
    category: "Technical Analysis"
  },
  "Support Level": {
    vi: "Ngưỡng hỗ trợ — mức giá mà lực mua đủ mạnh để ngăn giá giảm thêm",
    category: "Technical Analysis"
  },
  "Resistance Level": {
    vi: "Ngưỡng kháng cự — mức giá mà lực bán đủ mạnh để ngăn giá tăng thêm",
    category: "Technical Analysis"
  },
  "Moving Average": {
    vi: "Đường trung bình động — giá trung bình trong N phiên, làm mượt biến động",
    category: "Technical Analysis"
  },
  "SMA": {
    vi: "Simple Moving Average — trung bình động đơn giản, tính trung bình cộng giá",
    category: "Technical Analysis"
  },
  "EMA": {
    vi: "Exponential Moving Average — trung bình động hàm mũ, ưu tiên giá gần nhất",
    category: "Technical Analysis"
  },
  "RSI": {
    vi: "Relative Strength Index — chỉ số sức mạnh tương đối (0–100), đo quá mua/quá bán",
    category: "Technical Analysis"
  },
  "MACD": {
    vi: "Moving Average Convergence Divergence — chỉ báo xu hướng dựa trên chênh lệch EMA",
    category: "Technical Analysis"
  },
  "Bollinger Bands": {
    vi: "Dải Bollinger — 3 đường (SMA ± 2 độ lệch chuẩn), đo biến động giá",
    category: "Technical Analysis"
  },
  "Trend Line": {
    vi: "Đường xu hướng — đường nối các đỉnh/đáy để xác định hướng di chuyển giá",
    category: "Technical Analysis"
  },
  "Breakout": {
    vi: "Phá vỡ — giá vượt qua ngưỡng hỗ trợ/kháng cự, báo hiệu xu hướng mới",
    category: "Technical Analysis"
  },
  "Reversal Pattern": {
    vi: "Mô hình đảo chiều — tín hiệu kỹ thuật cho thấy xu hướng sắp thay đổi",
    category: "Technical Analysis"
  },
  "Head and Shoulders": {
    vi: "Mô hình vai-đầu-vai — mô hình đảo chiều với 3 đỉnh (đỉnh giữa cao nhất)",
    category: "Technical Analysis"
  },
  "Double Bottom": {
    vi: "Mô hình hai đáy — giá chạm đáy hai lần, báo hiệu đảo chiều tăng",
    category: "Technical Analysis"
  },
  "Golden Cross": {
    vi: "Giao cắt vàng — MA ngắn hạn cắt lên MA dài hạn, tín hiệu tăng giá",
    category: "Technical Analysis"
  },

  // === RISK & STRATEGY ===
  "Diversification": {
    vi: "Đa dạng hóa — phân bổ vốn vào nhiều tài sản để giảm rủi ro",
    category: "Risk & Strategy"
  },
  "Asset Allocation": {
    vi: "Phân bổ tài sản — chiến lược chia vốn giữa cổ phiếu, trái phiếu, tiền mặt...",
    category: "Risk & Strategy"
  },
  "Dollar-Cost Averaging": {
    vi: "Trung bình giá — đầu tư đều đặn một số tiền cố định bất kể giá thị trường",
    category: "Risk & Strategy"
  },
  "Risk Tolerance": {
    vi: "Khẩu vị rủi ro — mức độ rủi ro nhà đầu tư sẵn sàng chấp nhận",
    category: "Risk & Strategy"
  },
  "Volatility": {
    vi: "Biến động — mức dao động giá của tài sản trong một khoảng thời gian",
    category: "Risk & Strategy"
  },
  "Beta": {
    vi: "Hệ số beta — đo mức biến động cổ phiếu so với thị trường (β=1 là ngang thị trường)",
    category: "Risk & Strategy"
  },
  "Portfolio Rebalancing": {
    vi: "Tái cân bằng danh mục — điều chỉnh tỷ trọng tài sản về mức mục tiêu",
    category: "Risk & Strategy"
  },
  "Hedge": {
    vi: "Phòng ngừa rủi ro — sử dụng công cụ tài chính để bù đắp rủi ro tiềm ẩn",
    category: "Risk & Strategy"
  },
  "Correlation": {
    vi: "Tương quan — mức độ hai tài sản biến động cùng/ngược chiều (-1 đến +1)",
    category: "Risk & Strategy"
  },
  "Drawdown": {
    vi: "Mức sụt giảm — phần trăm giảm từ đỉnh xuống đáy của danh mục",
    category: "Risk & Strategy"
  },
  "Sharpe Ratio": {
    vi: "Tỷ số Sharpe — đo lợi nhuận vượt trội trên mỗi đơn vị rủi ro",
    category: "Risk & Strategy"
  },
  "Alpha": {
    vi: "Hệ số alpha — lợi nhuận vượt trội so với benchmark (α > 0 là tốt)",
    category: "Risk & Strategy"
  },

  // === CORPORATE ACTIONS ===
  "Dividend": {
    vi: "Cổ tức — phần lợi nhuận công ty chia cho cổ đông",
    category: "Corporate Actions"
  },
  "Stock Split": {
    vi: "Chia tách cổ phiếu — tăng số lượng cổ phiếu và giảm giá tương ứng",
    category: "Corporate Actions"
  },
  "Rights Issue": {
    vi: "Phát hành quyền mua — cho cổ đông hiện hữu quyền mua thêm cổ phiếu mới",
    category: "Corporate Actions"
  },
  "Buyback": {
    vi: "Mua lại cổ phiếu — công ty mua lại cổ phiếu của chính mình trên thị trường",
    category: "Corporate Actions"
  },
  "Dilution": {
    vi: "Pha loãng — giảm tỷ lệ sở hữu khi công ty phát hành thêm cổ phiếu mới",
    category: "Corporate Actions"
  },
  "Annual Report": {
    vi: "Báo cáo thường niên — tài liệu tổng hợp hoạt động và tài chính cả năm",
    category: "Corporate Actions"
  },
  "Earnings Report": {
    vi: "Báo cáo lợi nhuận — công bố kết quả tài chính hàng quý/năm",
    category: "Corporate Actions"
  },
  "Insider Trading": {
    vi: "Giao dịch nội gián — mua bán chứng khoán dựa trên thông tin chưa công bố (bất hợp pháp)",
    category: "Corporate Actions"
  },
  "Market Maker": {
    vi: "Nhà tạo lập thị trường — tổ chức luôn sẵn sàng mua/bán để đảm bảo thanh khoản",
    category: "Corporate Actions"
  },
  "Delisting": {
    vi: "Hủy niêm yết — cổ phiếu bị gỡ khỏi sàn giao dịch",
    category: "Corporate Actions"
  },
  "Listing": {
    vi: "Niêm yết — cổ phiếu được đưa lên sàn giao dịch để mua bán công khai",
    category: "Corporate Actions"
  },
};

export default glossary;

// Export categories for filtering
export const glossaryCategories = [
  'All',
  ...new Set(Object.values(glossary).map(g => g.category).filter(Boolean))
].sort();
