# APIs & Automation Tools

Network programmability enables engineers to automate configuration, monitoring, and management tasks using APIs and automation tools. Understanding REST APIs, data formats, and configuration management tools is essential for the modern network engineer.

## REST API Concepts

REST (Representational State Transfer) is an architectural style for building APIs. REST APIs are the standard for network controller interactions.

Key REST principles:

- **Stateless** — Each request contains all information needed; the server does not store client session state
- **Resource-based** — Everything is a resource identified by a URI (e.g., `/api/v1/interfaces/1`)
- **Client-server** — Clear separation between the client (requester) and server (provider)
- **Uniform interface** — Standard HTTP methods are used for all operations

### CRUD to HTTP Method Mapping

| CRUD Operation | HTTP Method | Description | Example |
|---------------|-------------|-------------|---------|
| **Create** | POST | Create a new resource | Add a new VLAN |
| **Read** | GET | Retrieve a resource | Get interface status |
| **Update** | PUT / PATCH | Modify an existing resource | Change port description |
| **Delete** | DELETE | Remove a resource | Delete an ACL entry |

PUT replaces the entire resource, while PATCH modifies only specified fields.

### HTTP Response Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request succeeded |
| 201 | Created | Resource successfully created |
| 400 | Bad Request | Malformed request syntax |
| 401 | Unauthorized | Authentication required or failed |
| 403 | Forbidden | Authenticated but not authorized |
| 404 | Not Found | Resource does not exist |
| 500 | Internal Server Error | Server-side error |

## Data Formats

### JSON (JavaScript Object Notation)

JSON is the most common format for REST APIs. It is lightweight, human-readable, and natively supported by Python and JavaScript.

```json
{
  "interface": {
    "name": "GigabitEthernet0/1",
    "enabled": true,
    "ip-address": "10.1.1.1",
    "subnet-mask": "255.255.255.0"
  }
}
```

### XML (Extensible Markup Language)

XML uses tags similar to HTML. It is more verbose than JSON but is used by NETCONF and some legacy systems.

```xml
<interface>
  <name>GigabitEthernet0/1</name>
  <enabled>true</enabled>
  <ip-address>10.1.1.1</ip-address>
  <subnet-mask>255.255.255.0</subnet-mask>
</interface>
```

| Feature | JSON | XML |
|---------|------|-----|
| Readability | More concise | More verbose |
| Data types | Strings, numbers, booleans, arrays, objects | Everything is text |
| Used by | REST APIs, RESTCONF | NETCONF, SOAP, legacy systems |
| Parsing | Native in most languages | Requires XML parser |

## Ansible

Ansible is an **agentless** automation tool ideal for network device management.

- **Agentless** — No software installed on managed devices; connects via SSH or APIs
- **Playbooks** — Written in YAML, define the desired state and tasks
- **Modules** — Pre-built units for specific tasks (e.g., `ios_config`, `ios_command`, `nxos_vlan`)
- **Inventory** — Defines managed hosts and groups
- **Idempotent** — Running a playbook multiple times produces the same result

Ansible is **push-based**: the control node pushes configurations to devices when playbooks are executed.

## Terraform

Terraform by HashiCorp is a **declarative Infrastructure as Code (IaC)** tool.

- **Declarative** — You define the desired end state, not the steps to get there
- **Providers** — Plugins for different platforms (AWS, Azure, Cisco ACI, Meraki)
- **Plan/Apply workflow** — `terraform plan` shows proposed changes, `terraform apply` executes them
- **State file** — Tracks the current state of managed infrastructure
- **Idempotent** — Only makes changes needed to reach the desired state

## AI/ML in Networking

Modern network platforms increasingly leverage artificial intelligence:

- **Anomaly detection** — Identifies unusual traffic patterns or device behavior that may indicate security threats or failures
- **Predictive analytics** — Forecasts potential issues (link failures, capacity exhaustion) before they impact users
- **Automated remediation** — Takes corrective action based on learned patterns
- **Cisco DNA Center Assurance** uses ML to baseline normal behavior and alert on deviations
