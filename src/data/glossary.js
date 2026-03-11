/**
 * Technical Glossary - Vietnamese Definitions
 * 
 * Format:
 * "English Term": {
 *   vi: "Vietnamese explanation",
 *   category: "Category name"
 * }
 * 
 * Categories: Models, OSI Layers, Protocols, Addressing, Switching, Routing, Security, Wireless, Devices, Concepts
 */

const glossary = {
  // === MODELS ===
  "OSI": {
    vi: "Mô hình tham chiếu kết nối các hệ thống mở - chia giao tiếp mạng thành 7 tầng",
    category: "Models"
  },
  "OSI model": {
    vi: "Mô hình 7 tầng chuẩn hóa cách các thiết bị mạng giao tiếp với nhau",
    category: "Models"
  },
  "TCP/IP": {
    vi: "Bộ giao thức Internet gồm 4 tầng, là nền tảng của mạng Internet hiện đại",
    category: "Models"
  },

  // === OSI LAYERS ===
  "Application Layer": {
    vi: "Tầng ứng dụng (tầng 7) - giao diện giữa người dùng và mạng",
    category: "OSI Layers"
  },
  "Presentation Layer": {
    vi: "Tầng trình diễn (tầng 6) - mã hóa, nén, định dạng dữ liệu",
    category: "OSI Layers"
  },
  "Session Layer": {
    vi: "Tầng phiên (tầng 5) - quản lý kết nối giữa các ứng dụng",
    category: "OSI Layers"
  },
  "Transport Layer": {
    vi: "Tầng vận chuyển (tầng 4) - đảm bảo dữ liệu đến đích tin cậy",
    category: "OSI Layers"
  },
  "Network Layer": {
    vi: "Tầng mạng (tầng 3) - định tuyến và địa chỉ logic (IP)",
    category: "OSI Layers"
  },
  "Data Link Layer": {
    vi: "Tầng liên kết dữ liệu (tầng 2) - địa chỉ MAC và đóng khung",
    category: "OSI Layers"
  },
  "Physical Layer": {
    vi: "Tầng vật lý (tầng 1) - truyền bit qua cáp, sóng radio",
    category: "OSI Layers"
  },

  // === PROTOCOLS ===
  "TCP": {
    vi: "Transmission Control Protocol - giao thức truyền tin cậy, có kết nối, đảm bảo thứ tự",
    category: "Protocols"
  },
  "UDP": {
    vi: "User Datagram Protocol - giao thức nhanh, không kết nối, không đảm bảo",
    category: "Protocols"
  },
  "IP": {
    vi: "Internet Protocol - giao thức định địa chỉ và định tuyến gói tin",
    category: "Protocols"
  },
  "ICMP": {
    vi: "Internet Control Message Protocol - gửi thông báo lỗi và kiểm tra mạng (ping)",
    category: "Protocols"
  },
  "ARP": {
    vi: "Address Resolution Protocol - chuyển đổi địa chỉ IP sang địa chỉ MAC",
    category: "Protocols"
  },
  "HTTP": {
    vi: "HyperText Transfer Protocol - giao thức truyền trang web",
    category: "Protocols"
  },
  "HTTPS": {
    vi: "HTTP bảo mật với mã hóa SSL/TLS",
    category: "Protocols"
  },
  "DNS": {
    vi: "Domain Name System - chuyển đổi tên miền thành địa chỉ IP",
    category: "Protocols"
  },
  "DHCP": {
    vi: "Dynamic Host Configuration Protocol - tự động cấp địa chỉ IP cho thiết bị",
    category: "Protocols"
  },
  "FTP": {
    vi: "File Transfer Protocol - giao thức truyền tệp tin",
    category: "Protocols"
  },
  "SSH": {
    vi: "Secure Shell - truy cập từ xa an toàn với mã hóa",
    category: "Protocols"
  },
  "OSPF": {
    vi: "Open Shortest Path First - giao thức định tuyến động trong mạng nội bộ",
    category: "Protocols"
  },
  "BGP": {
    vi: "Border Gateway Protocol - giao thức định tuyến giữa các mạng lớn (Internet)",
    category: "Protocols"
  },
  "SSL/TLS": {
    vi: "Giao thức mã hóa bảo mật cho truyền thông mạng",
    category: "Protocols"
  },
  "SMTP": {
    vi: "Simple Mail Transfer Protocol - giao thức gửi email",
    category: "Protocols"
  },
  "SNMP": {
    vi: "Simple Network Management Protocol - giao thức quản lý và giám sát thiết bị mạng",
    category: "Protocols"
  },
  "NTP": {
    vi: "Network Time Protocol - đồng bộ thời gian giữa các thiết bị mạng",
    category: "Protocols"
  },
  "Telnet": {
    vi: "Giao thức truy cập từ xa không mã hóa (không an toàn)",
    category: "Protocols"
  },
  "RIP": {
    vi: "Routing Information Protocol - giao thức định tuyến đơn giản dùng hop count",
    category: "Protocols"
  },
  "EIGRP": {
    vi: "Enhanced Interior Gateway Routing Protocol - giao thức định tuyến của Cisco",
    category: "Protocols"
  },

  // === ADDRESSING ===
  "MAC address": {
    vi: "Địa chỉ vật lý 48-bit của card mạng, định danh duy nhất thiết bị",
    category: "Addressing"
  },
  "IP address": {
    vi: "Địa chỉ logic để định danh thiết bị trên mạng",
    category: "Addressing"
  },
  "IPv4": {
    vi: "Địa chỉ IP phiên bản 4, gồm 32 bit (ví dụ: 192.168.1.1)",
    category: "Addressing"
  },
  "IPv6": {
    vi: "Địa chỉ IP phiên bản 6, gồm 128 bit, thay thế IPv4",
    category: "Addressing"
  },
  "subnet": {
    vi: "Mạng con - chia mạng lớn thành các phần nhỏ hơn để quản lý",
    category: "Addressing"
  },
  "subnetting": {
    vi: "Kỹ thuật chia mạng thành các mạng con nhỏ hơn",
    category: "Addressing"
  },
  "subnet mask": {
    vi: "Mặt nạ mạng con - xác định phần network và host của địa chỉ IP",
    category: "Addressing"
  },
  "CIDR": {
    vi: "Classless Inter-Domain Routing - ký hiệu độ dài prefix (ví dụ: /24)",
    category: "Addressing"
  },
  "default gateway": {
    vi: "Cổng mặc định - router để gửi dữ liệu ra ngoài mạng nội bộ",
    category: "Addressing"
  },
  "broadcast": {
    vi: "Gửi dữ liệu đến tất cả thiết bị trong mạng",
    category: "Addressing"
  },
  "unicast": {
    vi: "Gửi dữ liệu đến một thiết bị duy nhất",
    category: "Addressing"
  },
  "multicast": {
    vi: "Gửi dữ liệu đến một nhóm thiết bị cụ thể",
    category: "Addressing"
  },
  "loopback": {
    vi: "Địa chỉ 127.0.0.1 - dùng để test kết nối nội bộ trên chính thiết bị",
    category: "Addressing"
  },
  "private IP": {
    vi: "Địa chỉ IP nội bộ không định tuyến trên Internet (10.x, 172.16-31.x, 192.168.x)",
    category: "Addressing"
  },
  "public IP": {
    vi: "Địa chỉ IP có thể định tuyến và truy cập từ Internet",
    category: "Addressing"
  },

  // === SWITCHING ===
  "switch": {
    vi: "Thiết bị chuyển mạch tầng 2, chuyển frame dựa trên địa chỉ MAC",
    category: "Devices"
  },
  "VLAN": {
    vi: "Virtual LAN - mạng LAN ảo, phân chia logic không phụ thuộc vật lý",
    category: "Switching"
  },
  "trunk": {
    vi: "Đường trunk - kết nối mang nhiều VLAN giữa các switch",
    category: "Switching"
  },
  "trunk port": {
    vi: "Cổng trunk - mang traffic của nhiều VLAN với tag 802.1Q",
    category: "Switching"
  },
  "access port": {
    vi: "Cổng access - thuộc về một VLAN duy nhất, kết nối thiết bị đầu cuối",
    category: "Switching"
  },
  "802.1Q": {
    vi: "Chuẩn IEEE cho VLAN tagging trên đường trunk",
    category: "Switching"
  },
  "STP": {
    vi: "Spanning Tree Protocol - ngăn chặn loop trong mạng switch",
    category: "Switching"
  },
  "RSTP": {
    vi: "Rapid Spanning Tree Protocol - phiên bản nhanh hơn của STP",
    category: "Switching"
  },
  "MAC table": {
    vi: "Bảng địa chỉ MAC - switch lưu để biết gửi frame đến cổng nào",
    category: "Switching"
  },
  "flooding": {
    vi: "Gửi frame ra tất cả cổng khi không biết địa chỉ MAC đích",
    category: "Switching"
  },
  "EtherChannel": {
    vi: "Gộp nhiều link vật lý thành một link logic để tăng băng thông",
    category: "Switching"
  },
  "PortFast": {
    vi: "Tính năng Cisco cho phép cổng bỏ qua các trạng thái STP",
    category: "Switching"
  },

  // === ROUTING ===
  "router": {
    vi: "Thiết bị định tuyến tầng 3, chuyển packet giữa các mạng khác nhau",
    category: "Devices"
  },
  "routing": {
    vi: "Định tuyến - quá trình chọn đường đi tốt nhất cho packet",
    category: "Routing"
  },
  "routing table": {
    vi: "Bảng định tuyến - chứa thông tin đường đi đến các mạng",
    category: "Routing"
  },
  "static route": {
    vi: "Định tuyến tĩnh - cấu hình thủ công bởi admin",
    category: "Routing"
  },
  "dynamic routing": {
    vi: "Định tuyến động - router tự học đường đi qua giao thức",
    category: "Routing"
  },
  "hop": {
    vi: "Bước nhảy - mỗi router packet đi qua là một hop",
    category: "Routing"
  },
  "metric": {
    vi: "Thước đo để chọn đường đi tốt nhất (hop count, bandwidth...)",
    category: "Routing"
  },
  "administrative distance": {
    vi: "Độ tin cậy của nguồn định tuyến (số càng nhỏ càng ưu tiên)",
    category: "Routing"
  },
  "next-hop": {
    vi: "Router tiếp theo trên đường đi đến đích",
    category: "Routing"
  },
  "convergence": {
    vi: "Hội tụ - trạng thái khi tất cả router có cùng thông tin định tuyến",
    category: "Routing"
  },
  "load balancing": {
    vi: "Cân bằng tải - phân phối traffic qua nhiều đường đi",
    category: "Routing"
  },

  // === SECURITY ===
  "firewall": {
    vi: "Tường lửa - kiểm soát traffic vào/ra mạng theo quy tắc",
    category: "Security"
  },
  "ACL": {
    vi: "Access Control List - danh sách quy tắc cho phép/chặn traffic",
    category: "Security"
  },
  "NAT": {
    vi: "Network Address Translation - chuyển đổi IP private sang public",
    category: "Security"
  },
  "PAT": {
    vi: "Port Address Translation - NAT nhiều IP private qua 1 IP public",
    category: "Security"
  },
  "VPN": {
    vi: "Virtual Private Network - kết nối an toàn qua mạng công cộng",
    category: "Security"
  },
  "802.1X": {
    vi: "Chuẩn xác thực thiết bị trước khi cho phép truy cập mạng",
    category: "Security"
  },
  "port security": {
    vi: "Bảo mật cổng switch - giới hạn địa chỉ MAC được phép",
    category: "Security"
  },
  "AAA": {
    vi: "Authentication, Authorization, Accounting - khung bảo mật xác thực và phân quyền",
    category: "Security"
  },
  "RADIUS": {
    vi: "Remote Authentication Dial-In User Service - giao thức xác thực tập trung",
    category: "Security"
  },
  "encryption": {
    vi: "Mã hóa - chuyển đổi dữ liệu để bảo vệ khỏi truy cập trái phép",
    category: "Security"
  },

  // === WIRELESS ===
  "SSID": {
    vi: "Service Set Identifier - tên mạng Wi-Fi",
    category: "Wireless"
  },
  "WPA2": {
    vi: "Wi-Fi Protected Access 2 - chuẩn bảo mật Wi-Fi phổ biến",
    category: "Wireless"
  },
  "WPA3": {
    vi: "Chuẩn bảo mật Wi-Fi mới nhất, an toàn hơn WPA2",
    category: "Wireless"
  },
  "access point": {
    vi: "Điểm truy cập - thiết bị phát sóng Wi-Fi",
    category: "Wireless"
  },
  "802.11": {
    vi: "Họ chuẩn IEEE cho mạng không dây Wi-Fi",
    category: "Wireless"
  },
  "WLAN": {
    vi: "Wireless Local Area Network - mạng cục bộ không dây",
    category: "Wireless"
  },
  "WLC": {
    vi: "Wireless LAN Controller - thiết bị quản lý tập trung các access point",
    category: "Wireless"
  },

  // === DEVICES ===
  "hub": {
    vi: "Thiết bị tầng 1, gửi dữ liệu đến tất cả cổng (không thông minh)",
    category: "Devices"
  },
  "bridge": {
    vi: "Thiết bị tầng 2 kết nối hai segment mạng",
    category: "Devices"
  },
  "gateway": {
    vi: "Thiết bị kết nối hai mạng khác nhau, thường là router",
    category: "Devices"
  },
  "NIC": {
    vi: "Network Interface Card - card mạng kết nối thiết bị vào mạng",
    category: "Devices"
  },
  "modem": {
    vi: "Thiết bị chuyển đổi tín hiệu số sang analog và ngược lại",
    category: "Devices"
  },

  // === AUTOMATION & PROGRAMMABILITY ===
  "SDN": {
    vi: "Software-Defined Networking - kiến trúc mạng tách riêng control plane và data plane",
    category: "Automation"
  },
  "DNA Center": {
    vi: "Cisco DNA Center - nền tảng quản lý mạng tập trung dựa trên intent-based networking",
    category: "Automation"
  },
  "REST API": {
    vi: "Giao diện lập trình ứng dụng dựa trên HTTP, sử dụng các phương thức GET/POST/PUT/DELETE",
    category: "Automation"
  },
  "JSON": {
    vi: "JavaScript Object Notation - định dạng dữ liệu nhẹ, dễ đọc cho máy và người",
    category: "Automation"
  },
  "Ansible": {
    vi: "Công cụ tự động hóa cấu hình mạng, không cần agent, dùng YAML playbook",
    category: "Automation"
  },
  "Terraform": {
    vi: "Công cụ Infrastructure as Code - quản lý hạ tầng bằng mã khai báo",
    category: "Automation"
  },
  "control plane": {
    vi: "Mặt phẳng điều khiển - xử lý logic định tuyến và quyết định chuyển tiếp",
    category: "Automation"
  },
  "data plane": {
    vi: "Mặt phẳng dữ liệu - thực hiện chuyển tiếp packet dựa trên bảng đã được xây dựng",
    category: "Automation"
  },

  // === FHRP ===
  "HSRP": {
    vi: "Hot Standby Router Protocol - giao thức dự phòng gateway mặc định của Cisco",
    category: "Routing"
  },
  "VRRP": {
    vi: "Virtual Router Redundancy Protocol - giao thức dự phòng gateway chuẩn mở",
    category: "Routing"
  },
  "GLBP": {
    vi: "Gateway Load Balancing Protocol - dự phòng gateway với cân bằng tải",
    category: "Routing"
  },

  // === ADDITIONAL PROTOCOLS & CONCEPTS ===
  "LACP": {
    vi: "Link Aggregation Control Protocol (802.3ad) - giao thức gộp link chuẩn mở",
    category: "Switching"
  },
  "CDP": {
    vi: "Cisco Discovery Protocol - giao thức khám phá thiết bị lân cận của Cisco",
    category: "Switching"
  },
  "LLDP": {
    vi: "Link Layer Discovery Protocol - giao thức khám phá thiết bị lân cận chuẩn mở",
    category: "Switching"
  },
  "CAPWAP": {
    vi: "Control and Provisioning of Wireless Access Points - giao thức quản lý AP từ WLC",
    category: "Wireless"
  },
  "SLAAC": {
    vi: "Stateless Address Autoconfiguration - tự cấu hình IPv6 không cần DHCP server",
    category: "Addressing"
  },
  "NDP": {
    vi: "Neighbor Discovery Protocol - giao thức IPv6 thay thế ARP, tìm router và neighbor",
    category: "Protocols"
  },
  "DHCP snooping": {
    vi: "Tính năng bảo mật lọc gói DHCP giả mạo trên switch",
    category: "Security"
  },
  "DAI": {
    vi: "Dynamic ARP Inspection - kiểm tra và lọc gói ARP giả mạo",
    category: "Security"
  },
  "IPsec": {
    vi: "Internet Protocol Security - bộ giao thức mã hóa và xác thực cho VPN",
    category: "Security"
  },
  "TACACS+": {
    vi: "Terminal Access Controller Access-Control System - giao thức AAA của Cisco",
    category: "Security"
  },
  "syslog": {
    vi: "Giao thức ghi log tập trung từ các thiết bị mạng",
    category: "Protocols"
  },
  "DSCP": {
    vi: "Differentiated Services Code Point - giá trị đánh dấu QoS trong IP header",
    category: "Concepts"
  },
  "PoE": {
    vi: "Power over Ethernet - cấp nguồn điện qua cáp mạng cho thiết bị",
    category: "Concepts"
  },
  "EUI-64": {
    vi: "Extended Unique Identifier - phương pháp tạo interface ID IPv6 từ MAC address",
    category: "Addressing"
  },
  "hypervisor": {
    vi: "Phần mềm tạo và quản lý máy ảo (Type 1: bare-metal, Type 2: hosted)",
    category: "Concepts"
  },
  "IaaS": {
    vi: "Infrastructure as a Service - thuê hạ tầng máy chủ, mạng, lưu trữ trên cloud",
    category: "Concepts"
  },
  "PaaS": {
    vi: "Platform as a Service - nền tảng phát triển ứng dụng trên cloud",
    category: "Concepts"
  },
  "SaaS": {
    vi: "Software as a Service - phần mềm chạy trên cloud, truy cập qua trình duyệt",
    category: "Concepts"
  },

  // === CONCEPTS ===
  "encapsulation": {
    vi: "Đóng gói - quá trình thêm header vào dữ liệu khi đi xuống các tầng mạng",
    category: "Concepts"
  },
  "PDU": {
    vi: "Protocol Data Unit - đơn vị dữ liệu ở mỗi tầng (Segment, Packet, Frame, Bit)",
    category: "Concepts"
  },
  "bandwidth": {
    vi: "Băng thông - dung lượng truyền dữ liệu tối đa (Mbps, Gbps)",
    category: "Concepts"
  },
  "latency": {
    vi: "Độ trễ - thời gian để dữ liệu đi từ nguồn đến đích",
    category: "Concepts"
  },
  "throughput": {
    vi: "Thông lượng - lượng dữ liệu thực tế truyền được",
    category: "Concepts"
  },
  "packet": {
    vi: "Gói tin - đơn vị dữ liệu ở tầng Network (tầng 3)",
    category: "Concepts"
  },
  "frame": {
    vi: "Khung - đơn vị dữ liệu ở tầng Data Link (tầng 2)",
    category: "Concepts"
  },
  "segment": {
    vi: "Đoạn - đơn vị dữ liệu ở tầng Transport (tầng 4)",
    category: "Concepts"
  },
  "header": {
    vi: "Phần đầu chứa thông tin điều khiển của gói tin",
    category: "Concepts"
  },
  "payload": {
    vi: "Phần dữ liệu thực sự được truyền",
    category: "Concepts"
  },
  "protocol": {
    vi: "Giao thức - quy tắc chuẩn để các thiết bị giao tiếp",
    category: "Concepts"
  },
  "topology": {
    vi: "Cấu trúc liên kết mạng (star, ring, mesh...)",
    category: "Concepts"
  },
  "LAN": {
    vi: "Local Area Network - mạng cục bộ trong phạm vi nhỏ",
    category: "Concepts"
  },
  "WAN": {
    vi: "Wide Area Network - mạng diện rộng kết nối nhiều LAN",
    category: "Concepts"
  },
  "MAN": {
    vi: "Metropolitan Area Network - mạng đô thị, lớn hơn LAN nhỏ hơn WAN",
    category: "Concepts"
  },
  "three-way handshake": {
    vi: "Bắt tay 3 bước (SYN → SYN-ACK → ACK) để thiết lập kết nối TCP",
    category: "Concepts"
  },
  "half-duplex": {
    vi: "Truyền dữ liệu một chiều tại một thời điểm",
    category: "Concepts"
  },
  "full-duplex": {
    vi: "Truyền dữ liệu hai chiều đồng thời",
    category: "Concepts"
  },
  "collision domain": {
    vi: "Vùng xung đột - nơi các frame có thể va chạm nhau",
    category: "Concepts"
  },
  "broadcast domain": {
    vi: "Vùng broadcast - phạm vi nhận được frame broadcast",
    category: "Concepts"
  },
  "Ethernet": {
    vi: "Công nghệ mạng LAN phổ biến nhất, chuẩn IEEE 802.3",
    category: "Concepts"
  },
  "OUI": {
    vi: "Organizationally Unique Identifier - 24 bit đầu của MAC xác định nhà sản xuất",
    category: "Concepts"
  },
  "QoS": {
    vi: "Quality of Service - quản lý chất lượng dịch vụ mạng, ưu tiên traffic quan trọng",
    category: "Concepts"
  },
  "TTL": {
    vi: "Time To Live - số hop tối đa packet có thể đi qua trước khi bị hủy",
    category: "Concepts"
  },
  "MTU": {
    vi: "Maximum Transmission Unit - kích thước tối đa của một packet",
    category: "Concepts"
  },
  "port number": {
    vi: "Số cổng - định danh ứng dụng/dịch vụ trên thiết bị (0-65535)",
    category: "Concepts"
  },
};

export default glossary;

// Export categories for filtering
export const glossaryCategories = [
  'All',
  ...new Set(Object.values(glossary).map(g => g.category).filter(Boolean))
].sort();
