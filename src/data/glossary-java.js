/**
 * Java Programming Refresher Glossary - Vietnamese Definitions
 *
 * Format:
 * "English Term": {
 *   vi: "Vietnamese explanation",
 *   category: "Category name"
 * }
 *
 * Categories: Platform, Data Types, Operators & Flow, OOP Concepts,
 *             Access & Design, Collections, Exceptions, Generics,
 *             Functional & Streams, Modern Java
 */

const glossary = {
  // === PLATFORM ===
  "JVM": {
    vi: "Java Virtual Machine — máy ảo Java thực thi bytecode trên mọi nền tảng",
    category: "Platform"
  },
  "JDK": {
    vi: "Java Development Kit — bộ công cụ phát triển Java gồm compiler, debugger và thư viện",
    category: "Platform"
  },
  "JRE": {
    vi: "Java Runtime Environment — môi trường chạy ứng dụng Java, gồm JVM và thư viện chuẩn",
    category: "Platform"
  },
  "Bytecode": {
    vi: "Mã bytecode — mã trung gian do javac biên dịch, chạy trên JVM thay vì mã máy trực tiếp",
    category: "Platform"
  },
  "Classloader": {
    vi: "Bộ nạp lớp — thành phần JVM tải file .class vào bộ nhớ khi chương trình cần",
    category: "Platform"
  },
  "JIT Compiler": {
    vi: "Just-In-Time Compiler — biên dịch bytecode thành mã máy tại thời điểm chạy để tăng hiệu suất",
    category: "Platform"
  },
  "Garbage Collection": {
    vi: "Thu gom rác — JVM tự động giải phóng bộ nhớ của object không còn được tham chiếu",
    category: "Platform"
  },
  "Classpath": {
    vi: "Đường dẫn lớp — danh sách thư mục và JAR mà JVM tìm kiếm file .class",
    category: "Platform"
  },
  "Module (JPMS)": {
    vi: "Module Java — đơn vị đóng gói từ Java 9 (JPMS) giúp kiểm soát dependency và encapsulation",
    category: "Platform"
  },
  "REPL/jshell": {
    vi: "Read-Eval-Print Loop — công cụ jshell cho phép chạy thử code Java tương tác từ dòng lệnh",
    category: "Platform"
  },
  "javac": {
    vi: "Java Compiler — trình biên dịch chuyển mã nguồn .java thành bytecode .class",
    category: "Platform"
  },
  "JAR": {
    vi: "Java Archive — file nén chứa bytecode và tài nguyên, dùng để phân phối thư viện hoặc ứng dụng",
    category: "Platform"
  },

  // === DATA TYPES ===
  "int": {
    vi: "Kiểu số nguyên 32-bit — lưu giá trị từ -2^31 đến 2^31-1, kiểu số dùng phổ biến nhất",
    category: "Data Types"
  },
  "float": {
    vi: "Kiểu số thực 32-bit — số thập phân độ chính xác đơn, thêm hậu tố f (vd: 3.14f)",
    category: "Data Types"
  },
  "double": {
    vi: "Kiểu số thực 64-bit — số thập phân độ chính xác kép, mặc định cho literal thập phân",
    category: "Data Types"
  },
  "boolean": {
    vi: "Kiểu logic — chỉ có hai giá trị true hoặc false, dùng trong điều kiện và vòng lặp",
    category: "Data Types"
  },
  "char": {
    vi: "Kiểu ký tự 16-bit — lưu một ký tự Unicode, dùng dấu nháy đơn (vd: 'A')",
    category: "Data Types"
  },
  "byte": {
    vi: "Kiểu số nguyên 8-bit — giá trị từ -128 đến 127, tiết kiệm bộ nhớ cho dữ liệu nhỏ",
    category: "Data Types"
  },
  "long": {
    vi: "Kiểu số nguyên 64-bit — lưu số rất lớn, thêm hậu tố L (vd: 100L)",
    category: "Data Types"
  },
  "short": {
    vi: "Kiểu số nguyên 16-bit — giá trị từ -32768 đến 32767, ít dùng trong thực tế",
    category: "Data Types"
  },
  "String": {
    vi: "Chuỗi ký tự — object bất biến (immutable) chứa dãy ký tự, dùng dấu nháy kép",
    category: "Data Types"
  },
  "Array": {
    vi: "Mảng — cấu trúc dữ liệu kích thước cố định chứa các phần tử cùng kiểu, truy cập bằng chỉ số",
    category: "Data Types"
  },
  "null": {
    vi: "Giá trị null — tham chiếu không trỏ đến object nào, gây NullPointerException nếu dùng sai",
    category: "Data Types"
  },
  "Autoboxing": {
    vi: "Tự động đóng gói — Java tự chuyển kiểu nguyên thủy (int) sang wrapper (Integer) và ngược lại",
    category: "Data Types"
  },
  "Wrapper Class": {
    vi: "Lớp bọc — Integer, Double, Boolean... bọc kiểu nguyên thủy thành object để dùng với Collections",
    category: "Data Types"
  },
  "Type Inference (var)": {
    vi: "Suy luận kiểu — từ khóa var (Java 10+) để compiler tự xác định kiểu biến cục bộ",
    category: "Data Types"
  },

  // === OPERATORS & FLOW ===
  "Operator": {
    vi: "Toán tử — ký hiệu thực hiện phép tính hoặc so sánh (+, -, *, ==, &&, ...)",
    category: "Operators & Flow"
  },
  "Ternary Operator": {
    vi: "Toán tử ba ngôi — viết tắt if-else: điều_kiện ? giá_trị_đúng : giá_trị_sai",
    category: "Operators & Flow"
  },
  "instanceof": {
    vi: "Toán tử kiểm tra kiểu — xác định object có phải là instance của class/interface không",
    category: "Operators & Flow"
  },
  "Switch Expression": {
    vi: "Biểu thức switch — cú pháp switch hiện đại (Java 14+) trả về giá trị, dùng mũi tên ->",
    category: "Operators & Flow"
  },
  "Loop": {
    vi: "Vòng lặp — for, while, do-while, for-each dùng để lặp lại khối lệnh theo điều kiện",
    category: "Operators & Flow"
  },
  "Iterator": {
    vi: "Bộ lặp — object duyệt tuần tự qua Collection bằng hasNext() và next()",
    category: "Operators & Flow"
  },
  "break": {
    vi: "Lệnh break — thoát khỏi vòng lặp hoặc khối switch ngay lập tức",
    category: "Operators & Flow"
  },
  "continue": {
    vi: "Lệnh continue — bỏ qua phần còn lại của lần lặp hiện tại, chuyển sang lần lặp kế tiếp",
    category: "Operators & Flow"
  },
  "Assertion": {
    vi: "Xác nhận — lệnh assert kiểm tra điều kiện khi debug, ném AssertionError nếu sai",
    category: "Operators & Flow"
  },
  "Bitwise Operator": {
    vi: "Toán tử bitwise — thao tác trên từng bit: & (AND), | (OR), ^ (XOR), ~ (NOT), << >>",
    category: "Operators & Flow"
  },

  // === OOP CONCEPTS ===
  "Class": {
    vi: "Lớp — bản thiết kế (blueprint) định nghĩa thuộc tính và hành vi của object",
    category: "OOP Concepts"
  },
  "Object": {
    vi: "Đối tượng — thực thể cụ thể được tạo từ class, có trạng thái và hành vi riêng",
    category: "OOP Concepts"
  },
  "Method": {
    vi: "Phương thức — hàm thuộc class định nghĩa hành vi của object",
    category: "OOP Concepts"
  },
  "Field": {
    vi: "Trường — biến khai báo trong class lưu trữ trạng thái của object",
    category: "OOP Concepts"
  },
  "Constructor": {
    vi: "Hàm khởi tạo — phương thức đặc biệt được gọi khi tạo object bằng new, cùng tên với class",
    category: "OOP Concepts"
  },
  "this": {
    vi: "Từ khóa this — tham chiếu đến object hiện tại, phân biệt field với tham số cùng tên",
    category: "OOP Concepts"
  },
  "Inheritance": {
    vi: "Kế thừa — class con (extends) nhận lại field và method từ class cha, tái sử dụng code",
    category: "OOP Concepts"
  },
  "Polymorphism": {
    vi: "Đa hình — cùng một method có thể hoạt động khác nhau tùy vào object thực tế gọi nó",
    category: "OOP Concepts"
  },
  "Abstraction": {
    vi: "Trừu tượng hóa — ẩn chi tiết triển khai, chỉ cung cấp interface sử dụng cho bên ngoài",
    category: "OOP Concepts"
  },
  "Interface": {
    vi: "Giao diện — hợp đồng định nghĩa các method mà class phải implement, hỗ trợ đa kế thừa",
    category: "OOP Concepts"
  },
  "Encapsulation": {
    vi: "Đóng gói — che giấu dữ liệu bên trong class, chỉ truy cập qua getter/setter",
    category: "OOP Concepts"
  },
  "Abstract Class": {
    vi: "Lớp trừu tượng — class không thể tạo object trực tiếp, có thể chứa method trừu tượng lẫn cụ thể",
    category: "OOP Concepts"
  },
  "Overriding": {
    vi: "Ghi đè — class con định nghĩa lại method của class cha với cùng signature, đánh dấu @Override",
    category: "OOP Concepts"
  },
  "Overloading": {
    vi: "Nạp chồng — nhiều method cùng tên nhưng khác tham số (số lượng hoặc kiểu) trong cùng class",
    category: "OOP Concepts"
  },
  "super": {
    vi: "Từ khóa super — gọi constructor hoặc method của class cha từ class con",
    category: "OOP Concepts"
  },
  "Upcasting": {
    vi: "Ép kiểu lên — gán object class con vào biến kiểu class cha, luôn an toàn và tự động",
    category: "OOP Concepts"
  },
  "Downcasting": {
    vi: "Ép kiểu xuống — ép biến class cha về kiểu class con, cần cast tường minh và có thể lỗi",
    category: "OOP Concepts"
  },
  "Dynamic Dispatch": {
    vi: "Phân phối động — JVM chọn method override đúng tại runtime dựa trên kiểu thực của object",
    category: "OOP Concepts"
  },
  "Composition": {
    vi: "Tổ hợp — thiết kế class chứa object khác thay vì kế thừa, ưu tiên 'has-a' hơn 'is-a'",
    category: "OOP Concepts"
  },
  "Coupling": {
    vi: "Liên kết — mức độ phụ thuộc giữa các class, loose coupling (lỏng) là mục tiêu thiết kế tốt",
    category: "OOP Concepts"
  },

  // === ACCESS & DESIGN ===
  "Access Modifier": {
    vi: "Bộ điều chỉnh truy cập — từ khóa kiểm soát phạm vi nhìn thấy: public, private, protected",
    category: "Access & Design"
  },
  "public": {
    vi: "Truy cập công khai — field/method/class nhìn thấy được từ mọi nơi trong chương trình",
    category: "Access & Design"
  },
  "private": {
    vi: "Truy cập riêng tư — chỉ nhìn thấy trong cùng class, bảo vệ dữ liệu nội bộ",
    category: "Access & Design"
  },
  "protected": {
    vi: "Truy cập bảo vệ — nhìn thấy trong cùng package và class con ở package khác",
    category: "Access & Design"
  },
  "Package-private": {
    vi: "Truy cập mặc định — không ghi modifier, chỉ nhìn thấy trong cùng package",
    category: "Access & Design"
  },
  "Getter": {
    vi: "Phương thức getter — method trả về giá trị field private (vd: getName())",
    category: "Access & Design"
  },
  "Setter": {
    vi: "Phương thức setter — method gán giá trị cho field private kèm kiểm tra hợp lệ (vd: setName())",
    category: "Access & Design"
  },
  "SOLID": {
    vi: "Năm nguyên tắc thiết kế OOP — Single responsibility, Open-closed, Liskov, Interface segregation, Dependency inversion",
    category: "Access & Design"
  },
  "Single Responsibility Principle": {
    vi: "Nguyên tắc đơn trách nhiệm — mỗi class chỉ nên có một lý do để thay đổi",
    category: "Access & Design"
  },
  "Immutability": {
    vi: "Tính bất biến — object không thể thay đổi sau khi tạo, an toàn đa luồng (vd: String, record)",
    category: "Access & Design"
  },

  // === COLLECTIONS ===
  "List": {
    vi: "Danh sách — Collection có thứ tự, cho phép phần tử trùng lặp, truy cập bằng chỉ số",
    category: "Collections"
  },
  "ArrayList": {
    vi: "Danh sách mảng — List dựa trên mảng động, truy cập nhanh O(1), thêm/xóa giữa chậm O(n)",
    category: "Collections"
  },
  "LinkedList": {
    vi: "Danh sách liên kết — List dựa trên node liên kết, thêm/xóa đầu cuối nhanh O(1), truy cập chậm O(n)",
    category: "Collections"
  },
  "Set": {
    vi: "Tập hợp — Collection không chứa phần tử trùng lặp, dùng khi cần giá trị duy nhất",
    category: "Collections"
  },
  "HashSet": {
    vi: "Tập hợp băm — Set dựa trên hash table, thêm/tìm/xóa O(1) nhưng không giữ thứ tự",
    category: "Collections"
  },
  "TreeSet": {
    vi: "Tập hợp cây — Set dựa trên cây đỏ-đen, phần tử được sắp xếp tự nhiên, O(log n)",
    category: "Collections"
  },
  "Map": {
    vi: "Ánh xạ — cấu trúc lưu cặp key-value, key không trùng lặp, truy cập value qua key",
    category: "Collections"
  },
  "HashMap": {
    vi: "Ánh xạ băm — Map dựa trên hash table, truy cập O(1) nhưng không đảm bảo thứ tự",
    category: "Collections"
  },
  "TreeMap": {
    vi: "Ánh xạ cây — Map dựa trên cây đỏ-đen, key được sắp xếp tự nhiên, O(log n)",
    category: "Collections"
  },
  "Queue": {
    vi: "Hàng đợi — Collection theo nguyên tắc FIFO (vào trước ra trước), dùng offer/poll",
    category: "Collections"
  },
  "Deque": {
    vi: "Hàng đợi hai đầu — Double-ended queue, thêm/lấy phần tử ở cả hai đầu",
    category: "Collections"
  },
  "Iterator Pattern": {
    vi: "Mẫu Iterator — cách duyệt Collection tuần tự bằng hasNext()/next() mà không lộ cấu trúc bên trong",
    category: "Collections"
  },
  "Comparable": {
    vi: "Interface Comparable — class implement compareTo() để định nghĩa thứ tự sắp xếp tự nhiên",
    category: "Collections"
  },
  "Comparator": {
    vi: "Interface Comparator — object so sánh bên ngoài, cho phép nhiều tiêu chí sắp xếp khác nhau",
    category: "Collections"
  },

  // === EXCEPTIONS ===
  "Exception": {
    vi: "Ngoại lệ — sự kiện bất thường xảy ra khi chạy chương trình, cần xử lý để tránh crash",
    category: "Exceptions"
  },
  "Checked Exception": {
    vi: "Ngoại lệ kiểm tra — compiler bắt buộc xử lý (try-catch hoặc throws), vd: IOException",
    category: "Exceptions"
  },
  "Unchecked Exception": {
    vi: "Ngoại lệ không kiểm tra — RuntimeException, compiler không bắt buộc xử lý, vd: NullPointerException",
    category: "Exceptions"
  },
  "try-catch": {
    vi: "Khối try-catch — bắt và xử lý exception, code có thể lỗi đặt trong try, xử lý trong catch",
    category: "Exceptions"
  },
  "finally": {
    vi: "Khối finally — luôn được thực thi dù có exception hay không, dùng để giải phóng tài nguyên",
    category: "Exceptions"
  },
  "throw/throws": {
    vi: "throw ném exception thủ công, throws khai báo method có thể ném exception cho caller xử lý",
    category: "Exceptions"
  },
  "try-with-resources": {
    vi: "Try tự đóng tài nguyên — tự động gọi close() khi kết thúc block, dùng cho file/connection",
    category: "Exceptions"
  },
  "Stack Trace": {
    vi: "Vết ngăn xếp — danh sách các method call dẫn đến exception, đọc từ dưới lên để debug",
    category: "Exceptions"
  },

  // === GENERICS ===
  "Generic": {
    vi: "Kiểu tổng quát — cho phép class/method hoạt động với nhiều kiểu dữ liệu, kiểm tra tại compile-time",
    category: "Generics"
  },
  "Type Parameter": {
    vi: "Tham số kiểu — placeholder cho kiểu cụ thể, thường dùng T, E, K, V (vd: List<T>)",
    category: "Generics"
  },
  "Wildcard": {
    vi: "Ký tự đại diện (?) — đại diện kiểu không xác định trong generic, tăng tính linh hoạt",
    category: "Generics"
  },
  "Upper Bound": {
    vi: "Giới hạn trên (? extends T) — chấp nhận T hoặc subclass của T, chỉ đọc an toàn",
    category: "Generics"
  },
  "Lower Bound": {
    vi: "Giới hạn dưới (? super T) — chấp nhận T hoặc superclass của T, chỉ ghi an toàn",
    category: "Generics"
  },
  "Type Erasure": {
    vi: "Xóa kiểu — compiler loại bỏ thông tin generic tại runtime, thay bằng Object hoặc bound",
    category: "Generics"
  },
  "Bounded Type": {
    vi: "Kiểu có giới hạn (T extends Comparable) — ràng buộc type parameter phải implement interface",
    category: "Generics"
  },
  "Raw Type": {
    vi: "Kiểu thô — dùng generic class mà không chỉ định type parameter, mất type safety",
    category: "Generics"
  },

  // === FUNCTIONAL & STREAMS ===
  "Lambda": {
    vi: "Biểu thức lambda — hàm ẩn danh viết ngắn gọn: (params) -> body, dùng với functional interface",
    category: "Functional & Streams"
  },
  "Functional Interface": {
    vi: "Interface hàm — interface có đúng một abstract method, dùng với lambda (@FunctionalInterface)",
    category: "Functional & Streams"
  },
  "Method Reference": {
    vi: "Tham chiếu method — cú pháp rút gọn lambda: Class::method, dùng khi lambda chỉ gọi một method",
    category: "Functional & Streams"
  },
  "Stream": {
    vi: "Luồng dữ liệu — pipeline xử lý Collection theo kiểu khai báo (declarative), hỗ trợ lazy evaluation",
    category: "Functional & Streams"
  },
  "filter": {
    vi: "Lọc — Stream operation giữ lại phần tử thỏa điều kiện Predicate, bỏ phần tử không thỏa",
    category: "Functional & Streams"
  },
  "map (Stream)": {
    vi: "Ánh xạ — Stream operation biến đổi mỗi phần tử thành giá trị mới bằng Function",
    category: "Functional & Streams"
  },
  "reduce": {
    vi: "Rút gọn — Stream terminal operation gộp tất cả phần tử thành một giá trị duy nhất",
    category: "Functional & Streams"
  },
  "collect": {
    vi: "Thu thập — Stream terminal operation chuyển kết quả thành Collection, Map hoặc String",
    category: "Functional & Streams"
  },
  "Predicate": {
    vi: "Interface Predicate<T> — hàm nhận T trả về boolean, dùng cho filter và điều kiện",
    category: "Functional & Streams"
  },
  "Function": {
    vi: "Interface Function<T,R> — hàm nhận T trả về R, dùng cho map và biến đổi dữ liệu",
    category: "Functional & Streams"
  },
  "Consumer": {
    vi: "Interface Consumer<T> — hàm nhận T không trả về gì (void), dùng cho forEach và xử lý side-effect",
    category: "Functional & Streams"
  },
  "Supplier": {
    vi: "Interface Supplier<T> — hàm không nhận tham số, trả về T, dùng cho lazy initialization",
    category: "Functional & Streams"
  },
  "Optional": {
    vi: "Optional<T> — container có thể chứa hoặc không chứa giá trị, thay thế null để tránh NPE",
    category: "Functional & Streams"
  },
  "Collector": {
    vi: "Collector — chiến lược thu thập kết quả Stream, dùng qua Collectors.toList(), groupingBy()...",
    category: "Functional & Streams"
  },

  // === MODERN JAVA ===
  "Record": {
    vi: "Record (Java 16+) — class bất biến rút gọn, tự tạo constructor, getter, equals, hashCode, toString",
    category: "Modern Java"
  },
  "Sealed Class": {
    vi: "Lớp kín (Java 17+) — class giới hạn danh sách class con được phép kế thừa bằng permits",
    category: "Modern Java"
  },
  "Pattern Matching": {
    vi: "Khớp mẫu — kết hợp instanceof với khai báo biến, tự động cast mà không cần ép kiểu thủ công",
    category: "Modern Java"
  },
  "Text Block": {
    vi: "Khối văn bản (Java 15+) — chuỗi nhiều dòng dùng ba dấu nháy kép \"\"\", giữ nguyên định dạng",
    category: "Modern Java"
  },
  "Virtual Thread": {
    vi: "Luồng ảo (Java 21+) — lightweight thread do JVM quản lý, hỗ trợ hàng triệu thread đồng thời",
    category: "Modern Java"
  },
  "Switch Expression (Modern)": {
    vi: "Switch hiện đại (Java 14+) — trả về giá trị, dùng -> thay vì case/break, hỗ trợ pattern matching",
    category: "Modern Java"
  },
  "yield": {
    vi: "Từ khóa yield — trả về giá trị từ nhánh switch expression khi dùng khối lệnh {}",
    category: "Modern Java"
  },
  "permits": {
    vi: "Từ khóa permits — khai báo danh sách class con được phép kế thừa sealed class",
    category: "Modern Java"
  },
  "Deconstruction Pattern": {
    vi: "Mẫu phân rã (Java 21+) — tách record thành các thành phần trong instanceof hoặc switch",
    category: "Modern Java"
  },
  "Unnamed Variable": {
    vi: "Biến không tên _ (Java 22+) — dùng underscore cho biến không cần sử dụng, giảm code thừa",
    category: "Modern Java"
  },
  "Structured Concurrency": {
    vi: "Đồng thời có cấu trúc (Java 21+) — quản lý nhóm task đồng thời như một đơn vị, tự hủy khi lỗi",
    category: "Modern Java"
  },
  "Scoped Value": {
    vi: "Giá trị phạm vi (Java 21+) — chia sẻ dữ liệu immutable giữa các method/thread thay cho ThreadLocal",
    category: "Modern Java"
  }
};

export default glossary;

export const glossaryCategories = [
  'All',
  ...new Set(Object.values(glossary).map(g => g.category).filter(Boolean))
].sort();
