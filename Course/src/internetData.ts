import { MainLesson } from './data';

export const INTERNET_LESSONS: MainLesson[] = [
  {
    id: "1",
    title: "Internet Foundations",
    subLessons: [
      {
        id: "1-1",
        title: "The Internet: Connecting Africa to the World",
        description: "A network of networks.",
        content: "The Internet is a global system of interconnected computer networks. For Africa, it's a bridge to global markets, education, and innovation. From the subsea cables landing in Mombasa and Lagos to the satellite links in rural villages, the Internet is the infrastructure of the modern world. It's not just about websites; it's about connection and opportunity.",
        xp: 25,
        hideEditor: true
      },
      {
        id: "1-2",
        title: "The Web vs The Internet",
        description: "Infrastructure vs Service.",
        content: "The Internet is the hardware (cables, routers, servers), while the World Wide Web is a service that runs ON the Internet (pages, content). Think of the Internet as the roads and the Web as the cars traveling on them.",
        givenCode: "console.log(\"Internet: The Road; Web: The Car\");",
        codeExplanation: {
          given: "Comparison log.",
          rules: "They are not the same thing.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Internet: The Road; Web: The Car",
        validationKeyword: "Road",
        xp: 50
      },
      {
        id: "1-3",
        title: "IP Addresses: Your Digital ID",
        description: "Digital addresses.",
        content: "Every device on the Internet has a unique IP address (e.g., 192.168.1.1). It's like your home address, telling the network where to send data.",
        givenCode: "console.log(\"IP: 192.168.1.1\");",
        codeExplanation: {
          given: "IP example log.",
          rules: "IPv4 uses 4 numbers; IPv6 uses hexadecimal.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "IP: 192.168.1.1",
        validationKeyword: "192",
        xp: 50
      },
      {
        id: "1-4",
        title: "DNS: The Internet's Phonebook",
        description: "Translating names to numbers.",
        content: "DNS (Domain Name System) translates human-readable names like `google.com` into IP addresses that computers understand.",
        givenCode: "console.log(\"DNS: google.com -> 172.217.0.0\");",
        codeExplanation: {
          given: "DNS process log.",
          rules: "Saves us from remembering numbers.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "DNS: google.com -> 172.217.0.0",
        validationKeyword: "google",
        xp: 50
      },
      {
        id: "1-5",
        title: "Packets: Breaking Down Data",
        description: "Data chunks.",
        content: "When you send data, it's broken into small 'packets'. These travel different paths and are reassembled at the destination.",
        givenCode: "console.log(\"Packets: Small Chunks of Data\");",
        codeExplanation: {
          given: "Packet definition log.",
          rules: "Makes transmission efficient.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Packets: Small Chunks of Data",
        validationKeyword: "Chunks",
        xp: 50
      },
      {
        id: "1-6",
        title: "Routers: The Traffic Directors",
        description: "Directing packets.",
        content: "Routers are specialized computers that direct the flow of packets across networks, finding the fastest path.",
        givenCode: "console.log(\"Router: Directing Traffic\");",
        codeExplanation: {
          given: "Router role log.",
          rules: "Connects different networks.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Router: Directing Traffic",
        validationKeyword: "Traffic",
        xp: 50
      },
      {
        id: "1-7",
        title: "Protocols: The Rules of Talk",
        description: "Standard rules.",
        content: "Protocols like HTTP and TCP are sets of rules that define how data is formatted and transmitted.",
        givenCode: "console.log(\"Protocol: HTTP/HTTPS\");",
        codeExplanation: {
          given: "Protocol example log.",
          rules: "HTTPS is the secure version.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Protocol: HTTP/HTTPS",
        validationKeyword: "HTTP",
        xp: 50
      },
      {
        id: "1-8",
        title: "Servers and Clients",
        description: "Roles in the web.",
        content: "A Server stores data; a Client (your browser) requests it. The web is a dialogue between the two.",
        givenCode: "console.log(\"Client: Browser; Server: Data Provider\");",
        codeExplanation: {
          given: "Roles log.",
          rules: "Clients request; Servers respond.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Client: Browser; Server: Data Provider",
        validationKeyword: "Provider",
        xp: 50
      },
      {
        id: "1-9",
        title: "Bandwidth and Latency",
        description: "Speed and Delay.",
        content: "Bandwidth is the capacity (how much data); Latency is the delay (how long it takes).",
        givenCode: "console.log(\"Bandwidth: Capacity; Latency: Delay\");",
        codeExplanation: {
          given: "Metrics log.",
          rules: "Low latency is key for real-time apps.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Bandwidth: Capacity; Latency: Delay",
        validationKeyword: "Delay",
        xp: 50
      },
      {
        id: "1-10",
        title: "The Cloud",
        description: "Remote computing.",
        content: "The 'Cloud' refers to servers accessed over the Internet, allowing you to run apps without local hardware.",
        givenCode: "console.log(\"Cloud: Remote Servers\");",
        codeExplanation: {
          given: "Cloud definition log.",
          rules: "Enables scalability.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Cloud: Remote Servers",
        validationKeyword: "Remote",
        xp: 50
      },
      {
        id: "1-11",
        title: "Cybersecurity Basics",
        description: "Protecting the network.",
        content: "Encryption and firewalls protect data from unauthorized access. Security is a shared responsibility.",
        givenCode: "console.log(\"Security: Encryption and Firewalls\");",
        codeExplanation: {
          given: "Security log.",
          rules: "Always use HTTPS.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Security: Encryption and Firewalls",
        validationKeyword: "Encryption",
        xp: 50
      },
      {
        id: "1-12",
        title: "Foundations Mastered",
        description: "Summary of Internet basics.",
        content: "You've mastered the core concepts of how the Internet works. You understand IPs, DNS, Packets, and the roles of Clients and Servers. This knowledge is essential as you build applications that live on this global network. Congratulations!",
        xp: 100,
        hideEditor: true
      }
    ]
  }
];
