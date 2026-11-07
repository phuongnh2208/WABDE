/**
 * Dữ liệu 30 câu hỏi Quiz Arena - Trò chơi W-A-B-D-E
 * Bảo toàn 100% nguyên văn từng chữ, dấu câu, thuật ngữ và các phương án A, B, C, D.
 */

export interface QuestionItem {
  id: number;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
}

export type LetterCardType = 'W' | 'A' | 'B' | 'D' | 'E';

export interface LetterCardInfo {
  type: LetterCardType;
  name: string;
  points: number;
  description: string;
  color: string;
  badgeBg: string;
  textColor: string;
  icon: string;
}

export const LETTER_CARDS: Record<LetterCardType, LetterCardInfo> = {
  W: {
    type: 'W',
    name: 'WOW',
    points: 20,
    description: '+20 điểm',
    color: '#38BDF8',
    badgeBg: 'bg-sky-100 border-sky-300',
    textColor: 'text-sky-700',
    icon: '✨',
  },
  A: {
    type: 'A',
    name: 'ANGEL',
    points: 10,
    description: '+10 điểm',
    color: '#4ADE80',
    badgeBg: 'bg-emerald-100 border-emerald-300',
    textColor: 'text-emerald-700',
    icon: '👼',
  },
  B: {
    type: 'B',
    name: 'BOOM',
    points: -20,
    description: '-20 điểm',
    color: '#FB7185',
    badgeBg: 'bg-rose-100 border-rose-300',
    textColor: 'text-rose-700',
    icon: '💣',
  },
  D: {
    type: 'D',
    name: 'DEVIL',
    points: -10,
    description: '-10 điểm',
    color: '#C084FC',
    badgeBg: 'bg-purple-100 border-purple-300',
    textColor: 'text-purple-700',
    icon: '😈',
  },
  E: {
    type: 'E',
    name: 'EXTRA',
    points: 50,
    description: '+50 điểm',
    color: '#FBBF24',
    badgeBg: 'bg-amber-100 border-amber-300',
    textColor: 'text-amber-700',
    icon: '⭐',
  },
};

// Phân bổ 30 ô số theo luật W-A-B-D-E
export const DEFAULT_TILE_LETTERS: LetterCardType[] = [
  'W', 'A', 'B', 'D', 'E',
  'A', 'W', 'D', 'B', 'W',
  'E', 'B', 'A', 'W', 'D',
  'A', 'D', 'E', 'W', 'B',
  'W', 'A', 'D', 'W', 'E',
  'B', 'W', 'A', 'D', 'A'
];

export const QUESTIONS_DATA: QuestionItem[] = [
  {
    id: 1,
    question: "Tên miền chagee.vn hết hạn cuối năm 2025 và được Asset Việt Nam đăng ký lại ngày 4/1/2026, trong khi nhãn hiệu Chagee đã được bảo hộ tại Việt Nam. Việc đăng ký này phản ánh đặc điểm nào của cơ chế cấp tên miền .vn tại thời điểm đó?",
    options: [
      { key: "A", text: "Việc cấp tên miền dựa trên thứ tự đăng ký, vì hồ sơ đăng ký không bị thẩm định về mối liên hệ với nhãn hiệu đang được bảo hộ." },
      { key: "B", text: "Việc cấp tên miền phụ thuộc vào thẩm định nhãn hiệu, vì Trung tâm Internet Việt Nam đối chiếu dữ liệu bảo hộ trước khi chấp nhận hồ sơ." },
      { key: "C", text: "Việc cấp tên miền mang tính tạm thời, vì sau khi cấp, cơ quan quản lý rà soát xung đột với nhãn hiệu và tự thu hồi tên miền nếu phát hiện trùng lặp trong thời hạn quy định." },
      { key: "D", text: "Việc cấp tên miền ưu tiên chủ nhãn hiệu, vì người đã được bảo hộ có quyền giữ chỗ khi tên miền của chủ cũ hết hạn sử dụng." }
    ],
    correctAnswer: "A",
    explanation: "Cơ chế đăng ký tên miền .vn tuân theo nguyên tắc 'đăng ký trước được cấp trước' (first come, first served) và không thẩm định trước nhãn hiệu."
  },
  {
    id: 2,
    question: "Một sinh viên ngành Công nghệ thông tin thực hiện đồ án nghiên cứu về bảo mật phần mềm. Trong báo cáo, sinh viên sử dụng một phần nội dung từ tài liệu kỹ thuật có bản quyền của một công ty, đồng thời phân tích và đưa ra nhận xét riêng. Sinh viên cho rằng hành vi này chắc chắn hợp pháp vì chỉ phục vụ mục đích học tập và không thu lợi nhuận.\nTheo học thuyết sử dụng hợp lý, cách đánh giá nào sau đây chính xác nhất?",
    options: [
      { key: "A", text: "Việc sử dụng được xem là hợp lý nếu không thu lợi nhuận và phục vụ học tập, không cần xem xét tỷ lệ nội dung được trích dẫn." },
      { key: "B", text: "Việc sử dụng được xem là hợp lý nếu sinh viên ghi rõ tên tác giả và nguồn tài liệu, không cần xét thêm mục đích hoặc bản chất trích dẫn." },
      { key: "C", text: "Việc sử dụng không được xem là hợp lý vì mọi hành vi trích dẫn tài liệu có bản quyền đều cần sự đồng ý trước của chủ sở hữu." },
      { key: "D", text: "Việc sử dụng cần được xem xét qua bốn yếu tố: mục đích, bản chất, tỷ lệ nội dung và ảnh hưởng thương mại của tác phẩm." }
    ],
    correctAnswer: "D",
    explanation: "Học thuyết sử dụng hợp lý (Fair Use) dựa trên 4 yếu tố trọng yếu: mục đích sử dụng, bản chất tác phẩm, dung lượng/tỷ lệ trích dẫn và ảnh hưởng tiềm tàng tới thị trường của tác phẩm gốc."
  },
  {
    id: 3,
    question: "Điểm khác biệt cơ bản nhất giữa quyền bảo hộ nhãn hiệu và quyền bảo hộ quyền tác giả là gì?",
    options: [
      { key: "A", text: "Nhãn hiệu bảo vệ quyền độc quyền sao chép tác phẩm, còn quyền tác giả bảo vệ quyền sử dụng tên thương mại." },
      { key: "B", text: "Nhãn hiệu bảo vệ quyền độc quyền chế tạo sản phẩm, còn quyền tác giả bảo vệ quyền đăng ký sáng chế." },
      { key: "C", text: "Nhãn hiệu cho phép chủ sở hữu ngăn người khác sử dụng dấu hiệu gây nhầm lẫn, còn quyền tác giả bảo vệ quyền sao chép tác phẩm." },
      { key: "D", text: "Nhãn hiệu chỉ bảo vệ biểu tượng đồ họa, còn quyền tác giả chỉ bảo vệ các tác phẩm được công bố trực tuyến." }
    ],
    correctAnswer: "C",
    explanation: "Nhãn hiệu bảo vệ dấu hiệu phân biệt nhằm chống gây nhầm lẫn thương mại về nguồn gốc, còn quyền tác giả bảo hộ hình thức thể hiện và độc quyền sao chép tác phẩm."
  },
  {
    id: 4,
    question: "Một startup Việt Nam phát triển thành công thuật toán nén dữ liệu có tính thương mại cao nhưng dự báo sẽ bị công nghệ mới thay thế sau khoảng 2 năm. Đứng trước lựa chọn giữa Bằng độc quyền sáng chế và Bí mật kinh doanh theo luật hiện hành, chiến lược nào là tối ưu cho startup?",
    options: [
      { key: "A", text: "Nộp đơn xin Bằng độc quyền sáng chế, vì văn bằng sẽ tự động mở rộng phạm vi cấm đối thủ phát triển các phần mềm cải tiến phái sinh từ thuật toán gốc." },
      { key: "B", text: "Bảo hộ dưới dạng Bí mật kinh doanh, vì cơ chế này cấm đối thủ phân tích giải mã ngược hợp pháp từ sản phẩm phần mềm đã thương mại hóa trên thị trường." },
      { key: "C", text: "Nộp đơn xin Bằng độc quyền sáng chế, vì pháp luật cho phép giữ bí mật cấu trúc thuật toán trong thời hạn 20 năm độc quyền để tránh bị sao chép." },
      { key: "D", text: "Bảo hộ dưới dạng Bí mật kinh doanh, vì vừa tránh được nghĩa vụ bộc lộ giải pháp cho đối thủ học hỏi vừa tiết kiệm chi phí và thời gian khi sản phẩm nhanh cũ." }
    ],
    correctAnswer: "D",
    explanation: "Do vòng đời công nghệ ngắn (2 năm), quy trình nộp đơn cấp bằng sáng chế kéo dài và tốn kém, đồng thời bắt buộc công khai giải pháp. Bí mật kinh doanh là tối ưu nhất."
  },
  {
    id: 5,
    question: "Trình tự nào mô tả chính xác quá trình phát triển phần mềm từ khi hình thành ý tưởng đến khi được tích hợp trực tiếp vào phần cứng?",
    options: [
      { key: "A", text: "Sơ đồ logic → Mã nguồn → Mã đối tượng → Mã thực thi trên bộ nhớ → Vi mã." },
      { key: "B", text: "Sơ đồ logic → Mã nguồn → Mã thực thi trên bộ nhớ → Mã đối tượng → Vi mã." },
      { key: "C", text: "Sơ đồ logic → Mã nguồn → Vi mã → Mã đối tượng → Mã thực thi trên bộ nhớ." },
      { key: "D", text: "Sơ đồ logic → Mã đối tượng → Mã nguồn → Mã thực thi trên bộ nhớ → Vi mã." }
    ],
    correctAnswer: "A",
    explanation: "Theo thứ tự trừu tượng giảm dần: Sơ đồ logic (Logic diagram) → Mã nguồn (Source code) → Mã đối tượng (Object code) → Mã thực thi trên bộ nhớ (Executable code) → Vi mã (Microcode)."
  },
  {
    id: 6,
    question: "Công ty TechVision phát triển phần mềm quản lý dữ liệu doanh nghiệp và sở hữu quyền đối với sản phẩm. Sau khi đưa ra thị trường quốc tế, công ty phát hiện một doanh nghiệp nước ngoài đang kinh doanh bản sao trái phép. Hoạt động phân phối được thực hiện thông qua nhiều đơn vị trung gian, có liên quan đến xuất nhập khẩu giữa các quốc gia. Ban lãnh đạo muốn xây dựng chiến lược bảo vệ quyền lâu dài thay vì chỉ xử lý một vụ vi phạm riêng lẻ.\nTheo nội dung về các chiến lược bảo hộ quyền sở hữu trí tuệ, phương án nào phù hợp nhất?",
    options: [
      { key: "A", text: "Chủ động theo dõi các đối tượng nghi ngờ xâm phạm, phối hợp với doanh nghiệp phân phối để kiểm soát hàng hóa và đề nghị cơ quan chức năng trong nước xử lý các trường hợp phát hiện vi phạm." },
      { key: "B", text: "Đề nghị chính phủ đàm phán với quốc gia liên quan, thúc đẩy cơ chế giám sát chung và ký kết các thỏa thuận bảo vệ quyền sở hữu trí tuệ, đồng thời duy trì việc theo dõi thị trường nước ngoài." },
      { key: "C", text: "Chủ động theo dõi các đối tượng nghi ngờ xâm phạm, phối hợp với quan chức chính phủ kiểm tra hoạt động xuất nhập khẩu và yêu cầu chính phủ can thiệp khi có dấu hiệu vi phạm từ nước ngoài." },
      { key: "D", text: "Phối hợp với cơ quan thực thi pháp luật tại các quốc gia liên quan để kiểm tra đối tượng nghi vấn, tăng cường giám sát hoạt động phân phối và xử lý các trường hợp vi phạm được phát hiện." }
    ],
    correctAnswer: "D",
    explanation: "Chiến lược đa quốc gia hiệu quả đòi hỏi phối hợp trực tiếp với cơ quan thực thi pháp luật và hải quan tại các nước liên quan để xử lý chuỗi phân phối vi phạm."
  },
  {
    id: 7,
    question: "Một phần mềm được cung cấp dưới dạng bán quyền sử dụng: khách hàng trả phí để khai thác chức năng có sẵn, không được sửa đổi mã chương trình, và nhà cung cấp định kỳ phát hành bản cập nhật kèm hỗ trợ kỹ thuật. Theo nội dung phân loại sản phẩm và dịch vụ máy tính trong chương, nhận định nào phù hợp nhất?",
    options: [
      { key: "A", text: "Phần mềm này là sản phẩm, vì chức năng đã được phát triển hoàn chỉnh và được cung cấp cho khách hàng sử dụng." },
      { key: "B", text: "Phần mềm này thuộc nhóm hỗn hợp, vì mọi phần mềm bán theo quyền sử dụng đều vừa là sản phẩm vừa là dịch vụ." },
      { key: "C", text: "Phần mềm này là dịch vụ, vì khách hàng trả phí để được quyền sử dụng mà không sở hữu mã chương trình." },
      { key: "D", text: "Phần mềm này cần được xét theo bản chất và cách thức cung cấp, vì nó có thể là sản phẩm, dịch vụ hoặc sự kết hợp của cả hai." }
    ],
    correctAnswer: "D",
    explanation: "Việc phân loại phần mềm là sản phẩm hay dịch vụ phụ thuộc vào bản chất thỏa thuận, quyền chuyển giao và cách thức cung cấp thực tế."
  },
  {
    id: 8,
    question: "Một tập đoàn FinTech sở hữu thuật toán mã hóa giao dịch mang lại lợi nhuận khổng lồ. Trong cuộc họp chiến lược IP, Trưởng phòng R&D hào hứng đề xuất: 'Chúng ta hãy xin Bằng sáng chế cho thuật toán, đồng thời nộp mã nguồn đăng ký Quyền tác giả để nhận bảo hộ kép!'. Dưới góc độ rủi ro pháp lý, đề xuất này tiềm ẩn cạm bẫy nào?",
    options: [
      { key: "A", text: "Đề xuất này làm lộ bí mật kinh doanh nhưng đảm bảo 100% thu được bằng sáng chế vì thuật toán mã hóa được coi là một quy trình công nghệ hoàn chỉnh." },
      { key: "B", text: "Đề xuất này khiến thuật toán tự động rơi vào lĩnh vực công cộng sau mốc thời gian 10 năm do việc công khai mã nguồn khi đăng ký quyền tác giả." },
      { key: "C", text: "Đề xuất này làm mất Bí mật kinh doanh do nghĩa vụ bộc lộ thông tin, trong khi thuật toán thuần túy lại bị loại trừ không được bảo hộ sáng chế." },
      { key: "D", text: "Đề xuất này khiến Bằng độc quyền sáng chế của các thiết bị phần cứng chạy thuật toán bị vô hiệu hóa do vi phạm quy định cấm kết hợp văn bằng bảo hộ." }
    ],
    correctAnswer: "C",
    explanation: "Thuật toán toán học thuần túy thuộc đối tượng loại trừ không được bảo hộ sáng chế (Điều 59 Luật SHTT). Khi nộp đơn, bắt buộc phải công khai bộc lộ nên sẽ làm mất luôn bí mật kinh doanh."
  },
  {
    id: 9,
    question: "Một doanh nghiệp hoạt động trong lĩnh vực giáo dục muốn bảo hộ biểu tượng riêng được sử dụng trên các khóa học trực tuyến do mình cung cấp. Một hiệp hội giáo dục cũng xây dựng một hệ thống nhận diện chung, cho phép các cơ sở đào tạo đủ điều kiện sử dụng sau khi được đánh giá theo bộ tiêu chí của hiệp hội.\nCách phân loại nào sau đây phù hợp nhất với hai trường hợp trên?",
    options: [
      { key: "A", text: "Trường hợp thứ nhất sử dụng nhãn hiệu tập thể, trường hợp thứ hai sử dụng dấu chứng nhận." },
      { key: "B", text: "Trường hợp thứ nhất sử dụng nhãn hiệu dịch vụ, trường hợp thứ hai sử dụng dấu chứng nhận." },
      { key: "C", text: "Trường hợp thứ nhất sử dụng dấu chứng nhận, trường hợp thứ hai sử dụng nhãn hiệu tập thể." },
      { key: "D", text: "Trường hợp thứ nhất sử dụng nhãn hiệu dịch vụ, trường hợp thứ hai sử dụng nhãn hiệu tập thể." }
    ],
    correctAnswer: "B",
    explanation: "Biểu tượng khóa học trực tuyến của doanh nghiệp là nhãn hiệu dịch vụ; dấu hiệu dùng để chứng nhận các cơ sở đạt chuẩn tiêu chí của tổ chức/hiệp hội là nhãn hiệu chứng nhận (dấu chứng nhận)."
  },
  {
    id: 10,
    question: "Lập trình viên A nghỉ việc tại Công ty X và sang làm cho Công ty Y. A không mang theo tài liệu vật lý nhưng dùng \"\"bí quyết và kinh nghiệm\"\" để viết lại phần mềm tương tự. Nhận định nào đúng?",
    options: [
      { key: "A", text: "Công ty cũ gặp rào cản lớn do pháp luật rất khó áp dụng đối với tri thức vô hình trong đầu nhân viên và hợp đồng bảo mật rất khó thực thi trên thực tế." },
      { key: "B", text: "Công ty cũ không thể khởi kiện vì quy định về Bí mật kinh doanh chỉ bảo hộ tài liệu lưu trữ dưới dạng vật lý chứ không bảo hộ lưu đồ tư duy hay thuật toán." },
      { key: "C", text: "Công ty cũ sẽ thua kiện vì mọi bí quyết kỹ thuật tạo ra trong thời gian làm việc mặc nhiên thuộc quyền sở hữu cá nhân của người lao động." },
      { key: "D", text: "Công ty cũ sẽ bị Tòa án bác đơn vì toàn bộ bí quyết tích lũy trong đầu người lao động tự động chuyển thành tài sản thuộc lĩnh vực công cộng khi nghỉ việc." }
    ],
    correctAnswer: "A",
    explanation: "Ranh giới giữa kỹ năng cá nhân tích lũy và bí mật kinh doanh vô hình trong trí nhớ rất khó chứng minh và thực thi trước tòa."
  },
  {
    id: 11,
    question: "Một nhóm sinh viên phát triển nền tảng tuyển dụng CNTT mang tên DevLink, đăng ký tên miền devlink.vn vào tháng 3/2026 và tự thiết kế logo riêng. Đến tháng 8/2026, nhóm nhận được yêu cầu chấm dứt sử dụng tên DevLink từ một doanh nghiệp đã sử dụng tên này cho dịch vụ tuyển dụng từ năm 2024 và đã đăng ký nhãn hiệu trước đó.\nNhóm sinh viên cho rằng tên miền và logo của mình được tạo độc lập nên không ảnh hưởng đến quyền của doanh nghiệp kia.\nNhận định nào dưới đây có cơ sở lập luận phù hợp nhất?",
    options: [
      { key: "A", text: "Nhóm cần xem xét khả năng gây nhầm lẫn và phạm vi bảo hộ của nhãn hiệu có trước; việc đăng ký tên miền trước khi doanh nghiệp gửi thông báo giúp xác lập quyền ưu tiên sử dụng tên gọi." },
      { key: "B", text: "Nhóm cần xem xét khả năng gây nhầm lẫn và phạm vi bảo hộ của nhãn hiệu có trước; việc sử dụng tên gọi trên website thay vì logo giúp giới hạn tranh chấp trong phạm vi quyền tác giả." },
      { key: "C", text: "Nhóm cần xem xét khả năng gây nhầm lẫn và phạm vi bảo hộ của nhãn hiệu có trước; việc tự thiết kế logo riêng giúp xác lập quyền sử dụng tên gọi trong cùng lĩnh vực dịch vụ." },
      { key: "D", text: "Nhóm cần xem xét khả năng gây nhầm lẫn và phạm vi bảo hộ của nhãn hiệu có trước; việc đăng ký tên miền trước khi nhận thông báo không mặc nhiên xác lập quyền sử dụng nhãn hiệu." }
    ],
    correctAnswer: "D",
    explanation: "Tên miền không vượt trên nhãn hiệu đã được bảo hộ hợp pháp từ trước. Việc đăng ký tên miền không tự động cho phép sử dụng nhãn hiệu trong cùng lĩnh vực có khả năng gây nhầm lẫn."
  },
  {
    id: 12,
    question: "Một doanh nghiệp mua một bộ tài liệu đào tạo lập trình có bản quyền từ nhà xuất bản. Sau khi mua, doanh nghiệp muốn chuyển quyền sở hữu bộ tài liệu cho một đơn vị khác. Tuy nhiên, hợp đồng ban đầu quy định tài liệu được cung cấp theo giấy phép sử dụng có thời hạn và không cho phép chuyển giao quyền sử dụng cho bên thứ ba.\nDựa trên học thuyết bán lần đầu, nhận định nào sau đây phù hợp nhất?",
    options: [
      { key: "A", text: "Quyền phân phối bản sao có thể được thực hiện theo học thuyết bán lần đầu, nhưng việc sử dụng tiếp theo vẫn có thể chịu sự kiểm soát của hợp đồng thuê hoặc giấy phép sử dụng." },
      { key: "B", text: "Doanh nghiệp không được chuyển giao tài liệu vì học thuyết bán lần đầu không cho phép chủ sở hữu phân phối bản sao thông qua hình thức bán hoặc chuyển quyền sở hữu cho người khác." },
      { key: "C", text: "Doanh nghiệp được quyền chuyển giao tài liệu nếu không thu lợi nhuận vì hoạt động chuyển giao không nhằm mục đích thương mại sẽ không chịu sự điều chỉnh của quyền sở hữu trí tuệ." },
      { key: "D", text: "Doanh nghiệp có quyền chuyển giao tài liệu trong mọi trường hợp vì việc thanh toán tiền mua đã chấm dứt toàn bộ quyền kiểm soát của chủ sở hữu bản quyền đối với tài liệu." }
    ],
    correctAnswer: "A",
    explanation: "Học thuyết bán lần đầu (First Sale Doctrine) làm cạn kiệt quyền phân phối với bản sao đã bán, nhưng điều khoản hợp đồng/giấy phép sử dụng đi kèm vẫn có giá trị ràng buộc quyền sử dụng."
  },
  {
    id: 13,
    question: "Theo giáo trình, khi một nhà phát triển công bố một module phần mềm độc lập có bản quyền, một thông báo quyền tác giả hợp lệ thông thường bắt buộc phải bao gồm đầy đủ 4 yếu tố nào sau đây?",
    options: [
      { key: "A", text: "Ký hiệu ©, liên kết đến kho lưu trữ mã nguồn, giấy phép mã nguồn mở kèm theo và ngày biên dịch." },
      { key: "B", text: "Biểu tượng nhãn hiệu ™, con dấu pháp lý của cơ quan cấp phép, địa chỉ máy chủ." },
      { key: "C", text: "Ký hiệu ©, từ \"\"copyright\"\", năm cấp quyền/công bố và tên của chủ sở hữu bản quyền." },
      { key: "D", text: "Tên gọi phần mềm, phiên bản phát hành, chữ ký số của tác giả và mã hash SHA-256 của tập tin." }
    ],
    correctAnswer: "C",
    explanation: "Thông báo bản quyền chuẩn quốc tế gồm ký hiệu ©, từ copyright/copr, năm công bố và tên chủ sở hữu quyền tác giả."
  },
  {
    id: 14,
    question: "Công ty Việt Nam phát triển phần mềm phân tích dữ liệu và bảo vệ mã nguồn cùng tài liệu kỹ thuật bằng các biện pháp bảo mật nội bộ.\nMột nhân viên chuyển trái phép mã nguồn và tài liệu cho doanh nghiệp B tại quốc gia X. Doanh nghiệp B chỉnh sửa giao diện, thay đổi tên sản phẩm rồi phân phối phần mềm tại quốc gia X và Y.\nCông ty Việt Nam muốn xử lý hành vi xâm phạm đối với cả mã nguồn và thông tin kỹ thuật bí mật.\nPhương án nào phù hợp nhất?",
    options: [
      { key: "A", text: "Dựa vào quyền tác giả đối với mã nguồn tại Việt Nam để yêu cầu xử lý tại X và Y, đồng thời áp dụng quy định về bí mật kinh doanh của Việt Nam." },
      { key: "B", text: "Xác định quyền tác giả và bí mật kinh doanh bị xâm phạm, đồng thời đánh giá điều kiện bảo hộ và cơ chế thực thi tại từng quốc gia liên quan." },
      { key: "C", text: "Xác định quyền tác giả và bí mật kinh doanh bị xâm phạm, đồng thời áp dụng thống nhất pháp luật Việt Nam cho các hành vi tại X và Y." },
      { key: "D", text: "Dựa vào quyền tác giả đối với mã nguồn tại X và Y, đồng thời chỉ xử lý hành vi tiết lộ bí mật kinh doanh tại Việt Nam." }
    ],
    correctAnswer: "B",
    explanation: "Quyền sở hữu trí tuệ có tính lãnh thổ (territoriality). Cần căn cứ vào các điều ước quốc tế và đánh giá điều kiện thực thi cụ thể tại từng quốc gia X và Y."
  },
  {
    id: 15,
    question: "Một công ty phần mềm phát hiện một doanh nghiệp khác đang kinh doanh chương trình có nhiều điểm tương đồng với sản phẩm của mình. Công ty quyết định khởi kiện vì cho rằng đối thủ đã sao chép phần mềm. Tuy nhiên, phía bị kiện cho rằng chương trình của họ được phát triển độc lập và có một số nội dung đã được chỉnh sửa.\nTheo nội dung về xâm phạm bản quyền, nhóm căn cứ nào sau đây cần được tòa xem xét để đánh giá vụ việc?",
    options: [
      { key: "A", text: "Việc hai phần mềm có chức năng tương tự hay không, mức giá bán sản phẩm và tổng số lượng khách hàng sử dụng mỗi chương trình." },
      { key: "B", text: "Việc bên bị kiện có tiếp cận tác phẩm hay không, tính hợp lệ của bản quyền bên khởi kiện và mức độ khác biệt giữa tác phẩm tranh chấp với bản gốc." },
      { key: "C", text: "Số lượng nhân viên tham gia phát triển phần mềm, chi phí nghiên cứu và tổng thời gian hoàn thành chương trình của hai doanh nghiệp." },
      { key: "D", text: "Mức độ phổ biến của phần mềm trên thị trường, doanh thu của hai doanh nghiệp và thời điểm sản phẩm được đưa ra kinh doanh trên thị trường." }
    ],
    correctAnswer: "B",
    explanation: "Trong vụ kiện xâm phạm bản quyền, tòa án xem xét bằng chứng về quyền sở hữu hợp lệ của nguyên đơn, khả năng tiếp cận (Access) của bị đơn và mức độ tương đồng đáng kể (Substantial similarity)."
  },
  {
    id: 16,
    question: "Theo khoản 6 Điều 93 Luật Sở hữu trí tuệ Việt Nam, thời hạn hiệu lực của Giấy chứng nhận đăng ký nhãn hiệu được quy định như thế nào?",
    options: [
      { key: "A", text: "Có hiệu lực từ ngày cấp đến hết 10 năm kể từ ngày nộp đơn và được gia hạn nhiều lần liên tiếp, mỗi lần 10 năm." },
      { key: "B", text: "Có hiệu lực từ ngày nộp đơn đến hết 10 năm kể từ ngày cấp và được gia hạn nhiều lần liên tiếp, mỗi lần 10 năm." },
      { key: "C", text: "Có hiệu lực từ ngày cấp đến hết 10 năm kể từ ngày cấp và được gia hạn nhiều lần liên tiếp, mỗi lần 10 năm." },
      { key: "D", text: "Có hiệu lực từ ngày cấp đến hết 10 năm kể từ ngày nộp đơn và chỉ được gia hạn một lần, thêm 10 năm." }
    ],
    correctAnswer: "A",
    explanation: "Khoản 6 Điều 93 Luật SHTT quy định Giấy chứng nhận đăng ký nhãn hiệu có hiệu lực từ ngày cấp đến hết 10 năm kể từ ngày nộp đơn và có thể gia hạn nhiều lần liên tiếp, mỗi lần 10 năm."
  },
  {
    id: 17,
    question: "Một nhà sản xuất thiết bị công nghiệp sử dụng chương trình điều khiển đã qua biên dịch và liên kết. Trong quá trình sản xuất, các chỉ dẫn cấp thấp được ghi trực tiếp vào bộ nhớ ROM của thiết bị. Sau khi hoàn thiện, các chỉ dẫn này rất khó thay đổi. Thành phần được mô tả phù hợp nhất với giai đoạn nào trong năm giai đoạn phát triển phần mềm?",
    options: [
      { key: "A", text: "Mã thực thi trên bộ nhớ, vì chương trình đã được liên kết và nạp vào bộ nhớ để sẵn sàng chạy." },
      { key: "B", text: "Mã đối tượng, vì chương trình đã được biên dịch từ mã nguồn sang dạng nhị phân mà máy tính hiểu được." },
      { key: "C", text: "Sơ đồ logic, vì đây là giai đoạn xác định các bước xử lý của hệ thống và kết quả được cố định vào thiết bị." },
      { key: "D", text: "Vi mã, vì đây là lớp chỉ dẫn nằm sâu nhất, quy định cách bộ xử lý và phần cứng thực hiện từng lệnh." }
    ],
    correctAnswer: "D",
    explanation: "Vi mã (Microcode) là các chỉ dẫn cấp thấp nhất được nhúng sâu trong phần cứng/ROM để điều khiển mạch vi xử lý."
  },
  {
    id: 18,
    question: "Một công ty tài chính tại Việt Nam mua 01 bản quyền sử dụng phần mềm bảo mật thương mại. Bộ phận IT của công ty đã tiến hành hai hành vi: (1) Tạo 01 bản sao dự phòng của chương trình máy tính và lưu trữ nội bộ trên ổ đĩa mạng an toàn để thay thế nếu bản chính bị hỏng; (2) Tự ý cài đặt tiếp tệp thực thi từ bản quyền này lên toàn bộ 50 máy tính của nhân viên trong công ty để dùng song song mà không trả thêm phí bản quyền. Căn cứ theo quy định về ngoại lệ quyền tác giả trong Luật Sở hữu trí tuệ Việt Nam, hành vi của công ty tài chính này được đánh giá như thế nào?",
    options: [
      { key: "A", text: "Cả hai hành vi đều hợp pháp theo học thuyết cạn quyền vì công ty đã thanh toán đủ tiền mua gói phần mềm nên được toàn quyền triển khai trên hạ tầng thiết bị." },
      { key: "B", text: "Hành vi tạo bản sao dự phòng là hành vi hợp pháp, nhưng việc cài đặt sử dụng trên 50 máy tính là hành vi xâm phạm quyền tài sản của chủ sở hữu quyền tác giả." },
      { key: "C", text: "Việc cài đặt trên 50 máy tính là hợp pháp theo học thuyết sử dụng hợp lý vì chỉ dùng nội bộ, còn việc sao chép lưu trữ dự phòng mới là hành vi nhân bản lậu." },
      { key: "D", text: "Cả hai hành vi đều hợp pháp vì quyền tác giả chỉ bảo hộ mã nguồn văn bản, còn tệp thực thi cài đặt và bản sao lưu máy tính không thuộc phạm vi độc quyền tài sản." }
    ],
    correctAnswer: "B",
    explanation: "Luật SHTT cho phép người sử dụng hợp pháp tạo 01 bản sao dự phòng để thay thế khi bản gốc bị hỏng/mất. Việc tự ý cài đặt lên 50 máy tính khi chỉ mua 1 license là xâm phạm quyền sao chép và phân phối."
  },
  {
    id: 19,
    question: "Công ty SoftVN sở hữu quyền tác giả đối với mã nguồn của một ứng dụng. Doanh nghiệp B tại quốc gia X sao chép phần lớn mã nguồn, đổi tên ứng dụng và cung cấp cho khách hàng tại X và Y. SoftVN chưa đăng ký nhãn hiệu tại quốc gia X nhưng có tài liệu chứng minh quá trình sáng tạo và quyền sở hữu mã nguồn. Phương án nào phù hợp nhất để bảo vệ quyền lợi của SoftVN?",
    options: [
      { key: "A", text: "Đăng ký nhãn hiệu tại X để làm căn cứ chính xử lý hành vi sao chép mã nguồn, sau đó yêu cầu nền tảng phân phối gỡ bỏ ứng dụng." },
      { key: "B", text: "Thu thập chứng cứ sao chép mã nguồn, xác định quyền tác giả được bảo hộ và áp dụng thủ tục thực thi phù hợp tại X và Y." },
      { key: "C", text: "Đăng ký quyền tác giả tại X trước khi xử lý hành vi sao chép mã nguồn, sau đó sử dụng các cơ chế thực thi tại X và Y." },
      { key: "D", text: "Khởi kiện tại Việt Nam dựa trên quyền sở hữu mã nguồn, sau đó sử dụng trực tiếp bản án để yêu cầu thi hành tại X và Y." }
    ],
    correctAnswer: "B",
    explanation: "Theo Công ước Berne, quyền tác giả phát sinh tự động kể từ khi tác phẩm được định hình mà không cần đăng ký. SoftVN cần thu thập chứng cứ và khởi kiện/yêu cầu thực thi quyền tác giả tại X và Y."
  },
  {
    id: 20,
    question: "Một nhân viên freelance nhận tiền công bằng séc giấy gửi qua bưu điện và để biên lai, sao kê trong thùng rác chung của văn phòng. Gần đây, thư của anh bị thất lạc, rồi ngân hàng thông báo có đơn mở thẻ tín dụng mang tên anh được gửi về một địa chỉ lạ.\nThủ đoạn nào nhiều khả năng đã xảy ra, và phương án nào giúp giảm thiểu nguy cơ tái diễn hiệu quả nhất?",
    options: [
      { key: "A", text: "Lấy cắp thông tin vật lý; anh nên hủy các biên lai, sao kê chứa thông tin cá nhân, đồng thời đăng ký dịch vụ chuyển tiếp thư và thường xuyên kiểm tra thư gửi đến." },
      { key: "B", text: "Lấy cắp thông tin vật lý; anh nên trình báo việc thất lạc thư, liên hệ ngân hàng để ngăn chặn các giao dịch đáng ngờ và theo dõi những yêu cầu mở tín dụng bất thường." },
      { key: "C", text: "Lấy cắp thông tin vật lý; anh nên hủy tài liệu chứa thông tin cá nhân bằng cách cắt vụn, đồng thời chuyển sang nhận tiền công qua chuyển khoản thay cho séc giấy gửi qua bưu điện." },
      { key: "D", text: "Lấy cắp thông tin vật lý; anh nên kiểm tra báo cáo tín dụng tại cả ba tổ chức tín dụng, đồng thời yêu cầu ngân hàng cảnh báo khi xuất hiện hồ sơ tín dụng mới." }
    ],
    correctAnswer: "C",
    explanation: "Thủ đoạn bới rác/lấy cắp thư vật lý (Dumpster diving). Biện pháp triệt để là cắt vụn (shredding) tài liệu nhạy cảm và chuyển sang phương thức số hóa (chuyển khoản) thay vì thư bưu điện."
  },
  {
    id: 21,
    question: "Một công ty công nghệ phát triển một phần mềm quản lý dữ liệu với mã nguồn do đội ngũ lập trình viên tự viết. Một doanh nghiệp khác cũng phát triển phần mềm có chức năng tương tự nhưng sử dụng mã nguồn và cách triển khai riêng.\nTheo nội dung về quyền sở hữu trí tuệ, nhận định nào sau đây chính xác nhất?",
    options: [
      { key: "A", text: "Công ty chỉ được bảo hộ quyền sở hữu trí tuệ khi đã đăng ký đồng thời bản quyền và sáng chế cho toàn bộ chương trình máy tính." },
      { key: "B", text: "Công ty phát triển trước có quyền độc quyền đối với chức năng và ý tưởng của phần mềm, nên doanh nghiệp khác không được tạo ra sản phẩm có chức năng tương tự." },
      { key: "C", text: "Doanh nghiệp khác được quyền sao chép mã nguồn nếu thay đổi giao diện phần mềm và không sử dụng tên thương mại của công ty ban đầu." },
      { key: "D", text: "Công ty có thể được bảo hộ đối với cách thể hiện cụ thể của phần mềm, nhưng không mặc nhiên có quyền độc quyền đối với ý tưởng hoặc thuật toán được sử dụng." }
    ],
    correctAnswer: "D",
    explanation: "Nguyên tắc cốt lõi của quyền tác giả: chỉ bảo hộ hình thức thể hiện (expression), không bảo hộ ý tưởng, nguyên lý hoặc giải thuật (idea/expression dichotomy)."
  },
  {
    id: 22,
    question: "Công ty TechNova phát triển phần mềm quản lý nhân sự mang tên WorkPlus, có biểu tượng riêng, mã nguồn do đội ngũ lập trình tự xây dựng và thuật toán phân công nhân sự. Công ty muốn xác định các cơ chế sở hữu trí tuệ phù hợp để bảo vệ những thành phần này.\nPhương án phân loại nào phù hợp nhất?",
    options: [
      { key: "A", text: "Quyền tác giả bảo vệ hình thức thể hiện của mã nguồn; nhãn hiệu bảo vệ tên gọi và biểu tượng nhận diện sản phẩm." },
      { key: "B", text: "Quyền tác giả bảo vệ mã nguồn và thuật toán; nhãn hiệu bảo vệ tên gọi và biểu tượng dùng để phân biệt sản phẩm." },
      { key: "C", text: "Quyền tác giả bảo vệ mã nguồn; nhãn hiệu bảo vệ tên gọi, biểu tượng và giao diện chức năng của sản phẩm." },
      { key: "D", text: "Quyền tác giả bảo vệ mã nguồn và giao diện đồ họa; nhãn hiệu bảo vệ tên gọi cùng quy trình vận hành sản phẩm." }
    ],
    correctAnswer: "A",
    explanation: "Quyền tác giả bảo vệ hình thức thể hiện cụ thể của mã nguồn chương trình; nhãn hiệu bảo hộ tên gọi thương mại và biểu tượng (logo) phân biệt nguồn gốc sản phẩm/dịch vụ."
  },
  {
    id: 23,
    question: "Theo Luật Sở hữu trí tuệ Việt Nam hiện hành (Luật 2005, sửa đổi bổ sung 2022), về mặt pháp lý cơ chế Bằng độc quyền sáng chế và Bí mật kinh doanh có sự khác biệt cơ bản nào về thời hạn bảo hộ và nghĩa vụ đối với thông tin?",
    options: [
      { key: "A", text: "Sáng chế được bảo hộ 20 năm tính từ ngày nộp đơn kèm nghĩa vụ bộc lộ đầy đủ giải pháp; Bí mật kinh doanh được bảo hộ vô thời hạn kể cả khi thông tin đã bị giải mã ngược hợp pháp." },
      { key: "B", text: "Sáng chế được bảo hộ 20 năm tính từ ngày cấp văn bằng kèm nghĩa vụ bộc lộ mã nguồn; Bí mật kinh doanh được bảo hộ vô thời hạn và ngăn cấm tuyệt đối mọi hành vi tự nghiên cứu độc lập." },
      { key: "C", text: "Sáng chế được bảo hộ 20 năm tính từ ngày nộp đơn kèm nghĩa vụ bộc lộ đầy đủ giải pháp; Bí mật kinh doanh được bảo hộ vô thời hạn chừng nào duy trì được tính bảo mật nội bộ." },
      { key: "D", text: "Sáng chế được bảo hộ 20 năm tính từ ngày cấp văn bằng kèm nghĩa vụ bộc lộ mã nguồn; Bí mật kinh doanh được bảo hộ 20 năm kể từ ngày xác lập và có thể gia hạn liên tục." }
    ],
    correctAnswer: "C",
    explanation: "Sáng chế có thời hạn 20 năm từ ngày nộp đơn và buộc phải bộc lộ công khai đầy đủ; bí mật kinh doanh được bảo hộ vô thời hạn chừng nào chủ sở hữu vẫn giữ kín được tính bảo mật."
  },
  {
    id: 24,
    question: "Kỹ sư phần mềm Hoàng làm việc theo hợp đồng lao động tại Công ty Công nghệ K, được giao nhiệm vụ viết toàn bộ mã nguồn một hệ thống microservices xử lý giao dịch. Sau khi bàn giao bản dựng thành công và chấm dứt hợp đồng lao động, Hoàng tiến hành hai hoạt động: (1) Trích dẫn một đoạn logic thuật toán do chính mình viết vào bài báo khoa học cá nhân và ghi rõ mình là người lập trình; (2) Trích xuất nguyên vẹn module microservices nói trên đem bán dạng thư viện đóng gói cho một công ty phần mềm khác. Căn cứ theo quy định của Luật Sở hữu trí tuệ Việt Nam hiện hành, nhận định pháp lý nào sau đây là chính xác?",
    options: [
      { key: "A", text: "Việc bán module là hợp pháp vì Công ty K chưa đăng ký bản quyền tại Cục Bản quyền tác giả, nhưng bài báo vi phạm vì công khai cấu trúc mã nội bộ." },
      { key: "B", text: "Cả hai hành vi của Hoàng đều hợp pháp nếu thời hạn cam kết không cạnh tranh và bảo mật thông tin trong hợp đồng lao động với Công ty K đã kết thúc." },
      { key: "C", text: "Việc bán module là hợp pháp nếu Hoàng đã viết lại một số hàm xử lý, còn bài báo vi phạm vì quyền công bố tác phẩm vốn thuộc riêng về Công ty K." },
      { key: "D", text: "Hành vi ghi nhận tên tác giả trong bài báo khoa học là hợp pháp, nhưng việc bán module mã nguồn cho bên thứ ba là hành vi xâm phạm quyền tác giả." }
    ],
    correctAnswer: "D",
    explanation: "Hoàng là tác giả cá nhân nên có quyền nhân thân (được nêu tên); tuy nhiên Công ty K là chủ sở hữu quyền tác giả (sở hữu toàn bộ quyền tài sản), do đó Hoàng không có quyền bán module cho bên thứ ba."
  },
  {
    id: 25,
    question: "Công ty Alpha mua giấy phép sử dụng phần mềm kế toán cho một thiết bị. Hợp đồng cho phép tạo một bản sao lưu dự phòng nhưng không cho phép cài đặt trên thiết bị khác nếu chưa được nhà cung cấp chấp thuận.\nBộ phận IT tạo một bản sao lưu trên máy chủ và cài đặt phần mềm lên ba máy tính khác để nhân viên sử dụng đồng thời.\nNhận định nào phù hợp nhất?",
    options: [
      { key: "A", text: "Việc sao lưu và cài đặt đều vi phạm vì quyền tạo bản sao phần mềm chỉ thuộc về nhà cung cấp ban đầu." },
      { key: "B", text: "Việc sao lưu được phép theo hợp đồng, nhưng việc cài đặt thêm trên ba máy vượt quá phạm vi giấy phép đã cấp." },
      { key: "C", text: "Việc sao lưu và cài đặt đều được phép vì các bản sao chỉ được sử dụng trong hoạt động nội bộ của công ty." },
      { key: "D", text: "Việc sao lưu được phép theo hợp đồng, còn việc cài đặt thêm được phép nếu không phát sinh doanh thu từ phần mềm." }
    ],
    correctAnswer: "B",
    explanation: "Tạo bản sao lưu dự phòng được hợp đồng cho phép; việc cài đặt lên 3 máy khác mà chưa được chấp thuận là vi phạm phạm vi li-xăng (giấy phép sử dụng)."
  },
  {
    id: 26,
    question: "Một doanh nghiệp mua phần mềm quản lý bán hàng được phát triển sẵn. Nhà cung cấp cho phép doanh nghiệp bổ sung mô-đun quản lý kho và điều chỉnh một số chức năng theo quy trình riêng. Theo phân loại của Jim Prince, phần mềm này thuộc nhóm nào?",
    options: [
      { key: "A", text: "Phần mềm đóng hộp, vì doanh nghiệp chỉ được bổ sung mô-đun chứ không sở hữu mã nguồn của phần mềm." },
      { key: "B", text: "Phần mềm đặt riêng, vì doanh nghiệp điều chỉnh chức năng theo quy trình riêng của mình." },
      { key: "C", text: "Phần mềm đóng hộp, vì được phát triển sẵn để bán cho nhiều khách hàng; việc điều chỉnh của doanh nghiệp chỉ là thiết lập thêm." },
      { key: "D", text: "Phần mềm tùy chỉnh (hỗn hợp), vì phần mềm được mua sẵn rồi được sửa đổi và bổ sung để phù hợp với doanh nghiệp." }
    ],
    correctAnswer: "D",
    explanation: "Theo Jim Prince, phần mềm mua sẵn rồi tùy biến, bổ sung module riêng được xếp vào loại Customized/Hybrid software (phần mềm tùy chỉnh)."
  },
  {
    id: 27,
    question: "Tại cuộc họp HĐQT một doanh nghiệp công nghệ, Giám đốc R&D đề xuất nộp đơn xin cấp Bằng độc quyền sáng chế cho quy trình xử lý dữ liệu lõi, đồng thời yêu cầu duy trì quy trình đó dưới dạng Bí mật kinh doanh. Tại sao cố vấn pháp lý khẳng định hai cơ chế này loại trừ lẫn nhau trên cùng một giải pháp kỹ thuật?",
    options: [
      { key: "A", text: "Vì nghĩa vụ bộc lộ công khai và đầy đủ bản chất giải pháp kỹ thuật khi nộp đơn sáng chế mâu thuẫn trực tiếp và triệt tiêu điều kiện giữ kín của bí mật kinh doanh." },
      { key: "B", text: "Vì toàn bộ giải pháp kỹ thuật sẽ lập tức rơi vào lĩnh vực công cộng cho xã hội tự do sử dụng ngay tại thời điểm doanh nghiệp nộp đơn xin cấp bằng sáng chế." },
      { key: "C", text: "Vì quy định sở hữu trí tuệ Việt Nam ngăn cấm tuyệt đối việc áp dụng bảo hộ kết hợp nhiều hình thức tài sản trí tuệ khác nhau cho các thành phần của cùng một sản phẩm." },
      { key: "D", text: "Vì việc nộp đơn xin cấp bằng sáng chế sẽ làm chấm dứt tính mới tuyệt đối của bí mật kinh doanh ngay tại thời điểm Cục Sở hữu trí tuệ tiếp nhận hồ sơ." }
    ],
    correctAnswer: "A",
    explanation: "Bản chất sáng chế đòi hỏi công khai bộc lộ giải pháp cho xã hội tiếp cận; trong khi bí mật kinh doanh bắt buộc phải giữ kín. Hai cơ chế này loại trừ nhau."
  },
  {
    id: 28,
    question: "Một kỹ sư phần mềm tạo ra một công cụ quản lý dự án dạng web và công bố cấu trúc cơ sở dữ liệu gồm danh mục lịch làm việc, bảng chấm công chuẩn và thuật toán sắp xếp công việc tự động. Theo quy định về phạm vi bảo hộ quyền tác giả trong giáo trình, đối tượng nào dưới đây KHÔNG thuộc phạm vi được bảo hộ bản quyền?",
    options: [
      { key: "A", text: "Sổ tay hướng dẫn sử dụng và tài liệu đặc tả chức năng phần mềm kèm theo." },
      { key: "B", text: "Đoạn mã nguồn giao diện (CSS/HTML) do chính kỹ sư này tự tay thiết kế và viết ra." },
      { key: "C", text: "Chuỗi mã đối tượng (chuỗi nhị phân 0 và 1) đã được biên dịch từ mã nguồn gốc." },
      { key: "D", text: "Biểu mẫu lịch công tác đơn thuần và giải thuật sắp xếp công việc dùng trong phần mềm." }
    ],
    correctAnswer: "D",
    explanation: "Biểu mẫu đơn thuần (blank forms) và giải thuật/thuật toán toán học không thuộc phạm vi bảo hộ quyền tác giả."
  },
  {
    id: 29,
    question: "Theo giáo trình, khi một lập trình viên sáng tạo ra một sản phẩm phần mềm máy tính, luật quyền tác giả (Copyright) công nhận bảo hộ đối với yếu tố nào và dứt khoát loại trừ không bảo hộ đối tượng nào sau đây?",
    options: [
      { key: "A", text: "Bảo hộ tính năng nghiệp vụ và toàn bộ dữ liệu thực tế đầu vào; loại trừ không bảo hộ mã thực thi đã biên dịch trên bộ nhớ máy tính." },
      { key: "B", text: "Bảo hộ cách thức biểu đạt cụ thể của mã nguồn và mã đối tượng; loại trừ không bảo hộ ý tưởng giải thuật và sơ đồ logic trừu tượng." },
      { key: "C", text: "Bảo hộ quy trình kỹ thuật vận hành và cấu trúc giải thuật độc quyền; loại trừ không bảo hộ các tài liệu hướng dẫn kỹ thuật dạng văn bản." },
      { key: "D", text: "Bảo hộ giải pháp logic thực thi và các biểu mẫu tiện ích chuẩn hóa; loại trừ không bảo hộ chuỗi nhị phân khi chưa nạp vào phần cứng." }
    ],
    correctAnswer: "B",
    explanation: "Quyền tác giả bảo hộ hình thức biểu đạt cụ thể (mã nguồn, mã đối tượng) và dứt khoát không bảo hộ ý tưởng giải thuật và logic trừu tượng."
  },
  {
    id: 30,
    question: "Công ty DataSecure phát triển một phương pháp xử lý dữ liệu có khả năng đáp ứng các điều kiện bảo hộ sáng chế. Hiện tại, phương pháp này chỉ được nhân viên có thẩm quyền tiếp cận và đang được bảo vệ như bí mật kinh doanh.\nBan lãnh đạo cân nhắc nộp đơn đăng ký sáng chế nhưng vẫn muốn duy trì bảo hộ bí mật kinh doanh đối với chính thông tin kỹ thuật được công bố trong đơn.\nNhận định nào phù hợp nhất?",
    options: [
      { key: "A", text: "Công ty có thể duy trì bí mật kinh doanh đối với những phần đã công bố nếu tiếp tục áp dụng thỏa thuận bảo mật với nhân viên." },
      { key: "B", text: "Công ty có thể duy trì bí mật kinh doanh đối với những phần đã công bố nếu bằng sáng chế chưa được cấp hoặc chưa có hiệu lực." },
      { key: "C", text: "Công ty có thể giữ bí mật kinh doanh cho thông tin chưa công khai và phần kỹ thuật đã công bố sẽ không đáp ứng điều kiện bí mật." },
      { key: "D", text: "Công ty có thể duy trì những bí mật kinh doanh đối với toàn bộ những phương pháp vì công bố sáng chế chỉ phục vụ cơ quan thẩm định." }
    ],
    correctAnswer: "C",
    explanation: "Những thông tin kỹ thuật đã bộc lộ trong đơn công bố sáng chế sẽ mất tính bí mật và không còn được bảo hộ dưới dạng bí mật kinh doanh; chỉ phần thông tin giữ kín nội bộ chưa công khai mới giữ được bí mật kinh doanh."
  }
];
