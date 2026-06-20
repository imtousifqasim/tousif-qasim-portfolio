"use client"

import { useState, useRef, useEffect, useCallback } from "react"

const knowledgeBase = [
  {
    keywords: ["hi", "hello", "hey", "salam", "assalam", "good morning", "good evening", "helo"],
    reply: "Assalam-o-Alaikum! 👋\n\nTousif ke chatbot mein aapka swagat hai! Main aapki har website-related query ka jawab dunga. Services, pricing, portfolio — jo poochna hai poochho!\n\nBatao, aapke zehan mein kya hai? 😊",
  },
  {
    keywords: ["who", "about", "tousif", "developer", "introduce"],
    reply: "Acha! Tousif ke baare mein jaanna chahte ho 😄\n\nTousif Qasim ek professional WordPress Developer hai jo Lahore, Pakistan mein rehta hai. 7+ saal ka experience hai aur 100+ projects complete kar chuka hai — USA, UK, Germany, Greece tak clients hain.\n\nWordPress, WooCommerce, WHMCS, Hotel Booking Sites — sab ka expert hai.\n\nKoi specific sawaal hai Tousif ke baare mein? 🤔",
  },
  {
    keywords: ["service", "services", "what do you", "offer", "provide", "work"],
    reply: "Acha! Services ke baray mein pooch rahe ho 😊\n\nTousif mainly yeh kaam karta hai:\n🌐 WordPress websites\n🛒 WooCommerce stores\n🏨 Hotel & vacation rental sites\n🔧 WHMCS setup & customization\n📡 API integrations (Hostaway, Airbnb, etc.)\n🎨 Landing pages\n⚡ Speed optimization\n\nInme se koi specific service mind mein hai? 👀",
  },
  {
    keywords: ["wordpress", "wp", "theme", "plugin", "elementor"],
    reply: "WordPress ki baat hai toh Tousif ka pakka domain hai! 💪\n\n7+ saal ka experience, 100+ projects, Elementor aur WPBakery dono mein kaam karta hai. Agar simple blog ho ya complex enterprise site — sab karke dikhaya hai.\n\nAapko WordPress mein specifically kya chahiye? Theme customize karna hai ya nayi site banwani hai? 🤔",
  },
  {
    keywords: ["woocommerce", "ecommerce", "e-commerce", "online store", "shop", "store"],
    reply: "Acha! Apna online store khulwana chahte ho? 🛒\n\nTousif complete WooCommerce stores banata hai:\n✅ Product setup & variations\n✅ Payment gateways (Stripe, PayPal, JazzCash)\n✅ Custom checkout\n✅ Multi-vendor setup\n\nKya type ka store hai aapka? Clothes, electronics, ya kuch aur? 👀",
  },
  {
    keywords: ["hotel", "booking", "reservation", "room", "property", "airbnb", "vacation", "rental", "str", "hostaway"],
    reply: "Hotel ya rental property website? Tousif ki specialty hai yeh! 🏨\n\n25+ vacation rental & hotel sites bana chuka hai with:\n🏨 Hostaway integration\n🏠 Airbnb API\n📅 Real-time availability\n💳 Direct booking system\n\nKya aapke paas already property hai ya naya project start karna hai? 🌍",
  },
  {
    keywords: ["whmcs", "hosting", "cpanel", "whm", "billing", "automation"],
    reply: "WHMCS ki baat aayi toh Tousif se better koi nahi! 🚀\n\nCustom modules, payment gateways, hosting automation, template customization — sab karta hai. Hosting company chalani hai toh bilkul sahi jagah aaye ho!\n\nKya specifically chahiye WHMCS mein? Naya setup ya existing mein changes? 🤔",
  },
  {
    keywords: ["experience", "years", "how long", "expert", "senior", "skilled"],
    reply: "Oho! Experience ke baray mein jaanna chahte ho? 😄\n\nTousif ne 2016 mein start kiya tha — ab 7+ saal ho gaye hain. 100+ projects complete! USA, UK, Germany, Greece — sab jagah clients hain.\n\n📅 2016 – AZ Software House mein junior\n📅 2018 – DigiX mein Full Stack\n📅 2019 – KodeXs mein Senior WHMCS Dev\n📅 2020–Present – DigiScripts mein WordPress Architect\n\nKoi specific cheez jaanni hai experience ke baray mein? 🤔",
  },
  {
    keywords: ["project", "portfolio", "work", "example", "sample", "website", "built", "made"],
    reply: "Portfolio dekhna chahte ho? Bilkul dekho! 👇\n\nYeh hain kuch projects:\n🏨 viola-hotel.com\n🏝️ mykonosheritage.com\n🏔️ peakadventuregetaways.com\n🌊 taghazoutlife.com\n⭐ elitehostrentals.com\n\n100+ projects mein se kuch examples hain. Portfolio section mein aur details hain upar!\n\nKis type ki website aapko chahiye? 👀",
  },
  {
    keywords: ["price", "cost", "charge", "rate", "fee", "how much", "budget", "pricing"],
    reply: "Budget ki baat karte hain! 💰\n\nDepends karta hai project pe — lekin roughly:\n🌐 Simple site: $100–$300\n🛒 Store: $200–$500\n🏨 Booking site: $300–$800\n🔧 WHMCS Setup: $150–$400\n\nAapka kya project hai? Budget range bata do — exact quote nikaalte hain! 😊",
  },
  {
    keywords: ["time", "deadline", "delivery", "how long", "days", "week", "fast", "quick", "urgent"],
    reply: "Timeline ki baat hai toh yahi hai roughly:\n\n⚡ Landing Page: 1–2 din\n🌐 WordPress Site: 3–7 din\n🛒 Store: 5–10 din\n🏨 Booking Site: 7–14 din\n\nUrgent hai toh rush delivery bhi possible hai! Kab tak chahiye aapko? 📅",
  },
  {
    keywords: ["contact", "hire", "connect", "talk", "discuss", "message", "whatsapp", "reach", "get in touch", "start"],
    reply: "Seedha Tousif se baat karo! 🚀\n\nWhatsApp pe message karo, usually 1-2 ghante mein reply aata hai. Project details bhejo aur Tousif exact timeline aur quote de dega! 👇😊",
    showWhatsApp: true,
  },
  {
    keywords: ["location", "where", "country", "pakistan", "lahore", "based", "from"],
    reply: "Tousif Lahore, Pakistan mein rehta hai 🇵🇰\n\nLekin clients USA, UK, Germany, Australia, Morocco, Greece — duniya bhar se hain! Distance koi masla nahi hai, online hi sab kaam ho jata hai. 🌍\n\nAap kahan se ho? 😊",
  },
  {
    keywords: ["fiverr", "upwork", "freelance", "freelancer", "profile"],
    reply: "Fiverr pe Tousif ka profile hai @mr_tousifqasim — 4.5+ rating ke sath! 💼\n\nDirect clients bhi lete hain, jo usually better pricing aur communication ke liye acha hai. Aap kis platform se aa rahe ho? 😊",
  },
  {
    keywords: ["speed", "seo", "optimization", "fast", "performance", "pagespeed", "rank"],
    reply: "Website speed aur SEO optimize karwana chahte ho? ⚡\n\nTousif karta hai:\n✅ 90+ PageSpeed score\n✅ Meta tags & SEO setup\n✅ Image optimization\n✅ Caching setup (LiteSpeed/WP Rocket)\n✅ Google Search Console setup\n\nFast website = better ranking + zyada conversions!\nAapki kitni speed hai abhi? Check karwao? 🚀",
  },
  {
    keywords: ["security", "hack", "malware", "secure", "protection", "firewall"],
    reply: "Website security ki fikar hai? Tousif sambhal leta hai! 🔒\n\n✅ Security hardening\n✅ Malware removal\n✅ Firewall setup\n✅ Login protection\n✅ MSP Security Pro plugin (custom built!)\n\nKya aapki site hack hui hai ya prevent karwana chahte ho? 😊",
  },
  {
    keywords: ["thank", "thanks", "thank you", "great", "awesome", "nice", "good"],
    reply: "Shukriya! 😊 Allah aapka bhala kare!\n\nAgar kabhi project start karna ho toh Tousif yahi hai — bas WhatsApp karo! Koi aur sawaal hai? 😊",
  },
  {
    keywords: ["payment", "pay", "paypal", "bank", "transfer", "crypto", "how to pay", "payment method", "wise", "western union"],
    reply: "Payment karna hai? Yeh sab accept karta hai Tousif:\n💳 PayPal, Wise, Bank Transfer\n🪙 Crypto (USDT, BTC)\n📱 JazzCash, EasyPaisa\n🏧 Western Union\n\nUsually 50% advance, 50% delivery pe — simple hai!\nAapke liye konsa method easy hai? 💰",
  },
  {
    keywords: ["revision", "revisions", "change", "changes", "edit", "update", "modify", "modification"],
    reply: "Revisions toh hote hain har project mein! ✏️\n\nBasic site: 3 revisions\nStore: 5 revisions\nBooking site: 5 revisions\nCustom plugin: 3 revisions\n\nAgar kuch theek na lage toh bina jhijhak batao — Tousif fix karta hai! 💪\nAapka koi specific change hai zehan mein? 🤔",
  },
  {
    keywords: ["support", "after", "delivery", "maintain", "post", "live", "launch", "help after", "bug", "issue after"],
    reply: "Delivery ke baad bhi support milta hai! 😊\n\n🛠️ 7 din free bug fixing\n📞 WhatsApp support urgent issues ke liye\n🔧 Monthly maintenance packages bhi hain\n\nAapko akele nahi chhoda jayega! 🚀\nKoi specific concern hai post-launch ka? 🤔",
  },
  {
    keywords: ["maintenance", "package", "monthly", "plan", "retainer", "ongoing", "manage"],
    reply: "Monthly maintenance plans yeh hain! 💼\n\n📦 Basic $30/mo — updates, backups, monitoring\n📦 Standard $60/mo — speed, security, content\n📦 Premium $100/mo — SEO, priority support\n\nAapko kis level ki maintenance chahiye? Ya pehle basic le kar baad mein upgrade karo? 😊👇",
    showWhatsApp: true,
  },
  {
    keywords: ["technology", "technologies", "tech", "stack", "tools", "language", "framework", "use", "know"],
    reply: "Tech stack jaanna chahte ho? Yeh raha Tousif ka toolkit: 💻\n\n🌐 WordPress, Elementor, WPBakery\n🛒 WooCommerce, WHMCS\n💻 PHP, JS, HTML, CSS, MySQL\n⚛️ Next.js, React (basics)\n🔧 cPanel, WHM, CyberPanel\n📡 REST, Hostaway, Airbnb APIs\n🖥️ Git, VS Code, Figma\n\nImpressive hai na? 👀 Aapke project mein kya use karna chahoge?",
  },
  {
    keywords: ["language", "speak", "english", "urdu", "communication", "understand"],
    reply: "Communication ki tension na lo! 😊\n\nTousif dono bolta hai:\n🇬🇧 English — professional level\n🇵🇰 Urdu — native\n\nJo bhi aapko comfortable ho, usme baat karo!\nAap kaunsa prefer karte ho? 😊",
  },
  {
    keywords: ["digix", "company", "agency", "firm", "team", "organization", "studio"],
    reply: "DigiX — Tousif ki apni agency! 🏢\n\nLahore se operate karti hai, worldwide clients ke sath kaam karti hai. WordPress, WooCommerce, WHMCS mein specialize hai. 100+ projects deliver kar chuke hain!\n\nYeh koi bari company nahi hai — but ek choti agency mein directly expert se baat hoti hai, no middlemen! ✨\n\nAap agency pasand karte ho ya direct freelancer? 🤔",
  },
  {
    keywords: ["hosting", "server", "host", "domain", "cpanel", "vps", "digitalocean", "cloud", "deploy"],
    reply: "Hosting/server ki baat aa gayi! 🖥️\n\nTousif ka deep experience hai:\n🖥️ DigitalOcean, Contabo, Hostinger\n⚙️ cPanel, WHM, CyberPanel\n🚀 OpenLiteSpeed, LiteSpeed, Apache\n🔒 SSL installation\n📧 Email hosting setup\n\nAapko naya server chahiye ya existing hosting change karwani hai? 🤔",
  },
  {
    keywords: ["api", "integration", "connect", "third party", "third-party", "webhook", "sync"],
    reply: "API integrations? Tousif ka kaam hai yeh! 🔗\n\n🏨 Hostaway (STR management)\n🏠 Airbnb API\n📅 Booking.com\n💳 Stripe, PayPal\n📲 WhatsApp Business API\n🗺️ Google Maps\n📦 WHMCS API\n\nKoi specific integration chahiye aapko? Batao — solution nikaalte hain! 👇",
    showWhatsApp: true,
  },
  {
    keywords: ["mobile", "app", "android", "ios", "flutter", "react native", "application"],
    reply: "Mobile app ki baat aa gayi! 📱\n\nTousif web developer hai toh native apps nahi banata, lekin yeh kar sakta hai:\n📲 Progressive Web App (PWA) — jo mobile app jaisa kaam karta hai\n🌐 Mobile-responsive website — har screen pe perfect\n\nNative app chahiye toh trusted partner refer kar sakta hai. Aapko PWA chale ga ya native app? 🤔",
  },
  {
    keywords: ["process", "how it works", "steps", "procedure", "start", "begin", "workflow"],
    reply: "Process yeh hai — simple hai! 😊\n\n1️⃣ WhatsApp pe bat karo — requirements batao\n2️⃣ Tousif timeline aur quote dega\n3️⃣ 50% advance — kaam start\n4️⃣ Regular updates milti rahengi\n5️⃣ Approve karo — remaining payment\n6️⃣ Site live ho jayegi\n7️⃣ 7 din free support\n\nSimple, transparent, professional! Kya step hai jisme confusion hai? 🤔",
  },
  {
    keywords: ["refund", "money back", "guarantee", "cancel", "cancellation"],
    reply: "Refund policy clear hai! ✅\n\nKaam shuru nahi hua — poora refund\nAadha kaam hua — jitna kaam hua uske hisaab se\nDelivery aur approval ke baad — no refund\n\nTousif pehle client ko satisfy karta hai, phir final delivery. Quality guaranteed hai! 💯\nKoi concern hai is baare mein? 😊",
  },
  {
    keywords: ["nda", "confidential", "privacy", "secret", "agreement", "sign"],
    reply: "Bilkul! NDA sign kar sakte hain agar chahiye toh. 🔒\n\nAapke project details, business ideas, data — sab 100% confidential rakhna Tousif ka principle hai.\n\nKya aapko NDA chahiye project start karne se pehle? 😊",
  },
  {
    keywords: ["client", "clients", "country", "countries", "international", "worldwide", "global"],
    reply: "Tousif ka client base global hai! 🌍\n\n🇺🇸 USA, 🇬🇧 UK, 🇩🇪 Germany\n🇦🇺 Australia, 🇬🇷 Greece, 🇲🇦 Morocco\n🇮🇹 Italy, 🇯🇴 Jordan, 🇵🇰 Pakistan\n\n10+ countries ke clients ke sath kaam kiya hai. International clients hamesha welcome hain!\n\nAap kis country se ho? 😊",
  },
  {
    keywords: ["rating", "review", "reviews", "feedback", "testimonial", "stars", "satisfied"],
    reply: "Reviews ki baat aayi toh suno! ⭐\n\n4.5+ Rating on Fiverr\n100+ Projects completed\n10+ countries ke clients\nSab ka kehna hai — quality, communication aur delivery time mein Tousif number one hai!\n\nClient satisfaction is the #1 priority — hamesha! 😊\nKoi specific feedback chahiye kisi project ka?",
  },
  {
    keywords: ["figma", "design", "ui", "ux", "mockup", "prototype", "wireframe", "graphic"],
    reply: "Design related kaam bhi karta hai Tousif! 🎨\n\n✅ Figma design ko pixel-perfect WordPress mein convert karna\n✅ UI/UX implementation\n✅ Wireframe se live website\n\nAapke paas Figma design ready hai ya hume design bhi karna hoga? 😊",
  },
  {
    keywords: ["nextjs", "next.js", "react", "javascript framework", "modern", "headless"],
    reply: "Modern tech mein bhi haath hai! ⚛️\n\nNext.js 15, Tailwind CSS, Headless WordPress + Next.js — yeh sab aata hai. Blazing-fast websites ke liye Next.js best hai!\n\nAapko traditional WordPress chahiye ya headless set-up? 🤔",
  },
  {
    keywords: ["laravel", "php", "backend", "custom development", "custom web app", "web application"],
    reply: "Custom development kaam bhi karta hai Tousif! 🐘\n\nPHP mein advanced hai, Laravel aata hai, MySQL database design, REST API development — sab kuch.\n\nKoi custom web application chahiye? Batao features — solutions nikaalte hain! 💪",
  },
  {
    keywords: ["emergency", "urgent", "asap", "broken", "down", "crash", "fix", "hacked", "immediately"],
    reply: "🚨 Emergency hai? Ghabrao mat!\n\nWebsite down hai? Hacked ho gayi? Update karke broke ho gayi?\n\nTousif ko WhatsApp karo — emergency cases mein 30 minute mein reply aata hai! ⚡\n\nAbhi message karo 👇😊",
    showWhatsApp: true,
  },
  {
    keywords: ["bye", "goodbye", "see you", "later", "take care", "cya", "ok thanks", "okay thanks"],
    reply: "Allah Hafiz! 👋\n\nBaatein achhi lagi! Kabhi project start karna ho toh Tousif yahi hai — ek WhatsApp door hai! 🚀\n\nAcha din ho! 😊",
  },
  {
    keywords: ["pkr", "rupees", "rupay", "kitna", "cost pakistan", "pakistan mein", "local", "rate pakistan", "charges pakistan", "price pakistan"],
    reply: "Pakistan mein pricing yeh hai roughly: 💰\n\n🌐 Simple 5 page site: PKR 20,000–50,000\n🌐 WordPress Business: PKR 35,000–80,000\n🛒 Store: PKR 60,000–150,000\n🏨 Booking: PKR 80,000–200,000\n\nExact quote apni requirements ke hisaab se nikalta hai. Budget kya hai aapka? Batao — best deal dunga! 😊👇",
    showWhatsApp: true,
  },
  {
    keywords: ["sasta", "cheap", "discount", "kam price", "affordable", "budget mein", "thora kam", "negotiate", "flexible price", "reduce"],
    reply: "Budget ki baat hai toh tension na lo! 😊\n\nStudents ke liye special rates\nStartups ke liye discount\nPackage deals pe negotiation possible\n\nBas apni budget batao WhatsApp pe — Tousif koi na koi rasta nikaal lega! 👇",
    showWhatsApp: true,
  },
  {
    keywords: ["advance", "pehle", "trust", "fraud", "scam", "safe", "guarantee", "bharosa", "dhoka", "loss"],
    reply: "Bharosa — yeh important hai! 🤝\n\nTousif ke sath safe ho:\n🔒 50% advance, 50% delivery pe\n📋 Written agreement hota hai\n🖥️ Kaam ke doran updates milti hain\n✅ Delivery ke baad 7 din free support\n⭐ 100+ projects ka proof hai\n\nPehle portfolio dekho, reviews parho, phir decide karo! 😊",
  },
  {
    keywords: ["kitne din", "kab tak", "time lagega", "jaldi", "urgent hai", "kal tak", "week mein", "jaldi chahiye"],
    reply: "Jaldi chahiye? Yeh raha timeline: ⏰\n\n⚡ Landing Page: 1-2 din\n🌐 WordPress Site: 3-5 din\n🛒 Store: 5-10 din\n🏨 Booking: 7-14 din\n\nRush delivery bhi possible hai! Kab tak chahiye aapko? WhatsApp pe batao! 👇😊",
    showWhatsApp: true,
  },
  {
    keywords: ["pehle dekho", "sample", "demo", "trial", "test", "example dikhao", "portfolio dikhao", "kaam dikhao", "proof"],
    reply: "Kaam dekhna chahte ho? Yeh lo examples! 👇\n\n🏨 viola-hotel.com\n🏝️ mykonosheritage.com\n🏔️ peakadventuregetaways.com\n🌊 taghazoutlife.com\n⭐ elitehostrentals.com\n\nSab real client projects hain! Portfolio section mein aur details hain upar. Kya type ka project aapka hai? 👀",
  },
  {
    keywords: ["hosting kaun", "domain kaun", "domain bhi", "server bhi", "hosting chahiye", "domain chahiye", "godaddy", "namecheap", "hostinger"],
    reply: "Hosting aur domain ka sawaal aa gaya! 🖥️\n\n🌐 Domain: PKR 2,000–5,000/saal (Namecheap, GoDaddy)\n🖥️ Shared Hosting: PKR 3,000–8,000/saal\n🚀 VPS: PKR 15,000–40,000/saal\n\nTousif help karega:\n✅ Best hosting suggest karega\n✅ Setup kar dega\n✅ SSL laga dega\n✅ Email configure kar dega\n\nSab ek jagah se ho jayega! Aapko hosting bhi chahiye ya sirf website? 😊",
  },
  {
    keywords: ["mobile pe", "phone pe", "responsive", "android pe", "iphone pe", "mobile friendly", "screen", "chhoti screen"],
    reply: "Haan bilkul! Har website 100% mobile responsive hoti hai! 📱\n\nMobile, tablet, laptop — sab pe perfect dikhti hai. Pakistan mein 60%+ traffic mobile se aata hai, aur Google bhi mobile-friendly sites pasand karta hai.\n\nExtra charge nahi — yeh standard feature hai! 🚀\nAap mobile version ke liye koi specific requirement chahte ho? 🤔",
  },
  {
    keywords: ["easypaisa", "jazzcash", "jazz cash", "easy paisa", "local payment", "pakistan payment", "meezan", "bank pakistan", "local transfer"],
    reply: "Pakistan mein payment ke liye sab available hai! 😊\n\n📱 JazzCash ✅\n📱 EasyPaisa ✅\n🏦 Local Bank Transfer (Meezan, HBL, UBL) ✅\n💳 PayPal, Wise ✅\n\nJo aapko comfortable ho, wahi use karo! Aap kaunsa prefer karte ho? 😊",
  },
  {
    keywords: ["seekhna", "training", "sikhao", "guide", "tutorial", "manage khud", "khud update", "sikhna chahta"],
    reply: "Acha! Khud manage karna seekhna chahte ho? 😄\n\nTousif delivery ke baad training bhi deta hai:\n📹 Short video tutorial banata hai\n📞 WhatsApp pe guide karta hai\n✍️ Basic updates khud kar sako ge\n\nKoi bhi simple change — aap khud kar sakoge, kisi developer ke bina! 💪\nKya seekhna chahte ho specifically? 🤔",
  },
  {
    keywords: ["content", "likhai", "text", "matter", "copy", "likhna", "images", "photos", "content kaun"],
    reply: "Content ka sawaal aaya! 📝\n\nAgar aap content do — toh best hai (aapka business, aapki info)\nNahi toh Tousif free stock images laga deta hai\nProfessional content writing bhi available hai (extra charge)\n\nPhotos ho toh aur acha lagta hai! Kya aapke paas content ready hai ya Tousif se karaoge? 😊",
  },
  {
    keywords: ["update baad", "baad mein", "changes baad", "add karna", "future", "modify", "naya page", "nayi cheez"],
    reply: "Baad mein changes? Koi problem nahi! 😊\n\n✅ 7 din free support delivery ke baad\n🔧 Monthly maintenance packages:\n   Basic: PKR 5,000/mo\n   Standard: PKR 10,000/mo\n   Premium: PKR 18,000/mo\n\nYa single update bhi karwa sakte ho per hour rate pe. Tousif hamesha available hai!\nAapko abhi kya add karwana hai? 🤔",
  },
  {
    keywords: ["google", "rank", "search", "google pe", "dhundhna", "search engine", "seo pakistan", "google mein aaye"],
    reply: "Google pe aana hai? Bilkul! 📈\n\nTousif basic SEO har project mein include karta hai:\n✅ Meta tags & descriptions\n✅ Google Search Console\n✅ Sitemap submission\n✅ Mobile friendly\n✅ Fast speed\n\nAdvanced SEO ke liye alag package hai. Aapko basic SEO chahiye ya full-on ranking? 😊",
  },
  {
    keywords: ["pehle kaam karo", "pehle banao", "baad mein payment", "pehle design", "pehle dikao", "payment baad", "banao pehle"],
    reply: "Samajh gaya aapka point! 🤝\n\nYeh process hai:\n1️⃣ 50% advance — kaam shuru\n2️⃣ Kaam ke doran updates milti hain\n3️⃣ Approval ke baad remaining 50%\n4️⃣ Phir website live!\n\nPehle portfolio dekho, reviews parho — phir trust karo. Yeh system dono ke liye fair hai! 😊",
  },
  {
    keywords: ["doosra", "competitor", "compare", "koi aur", "dusra developer", "agency", "better", "kyun tousif", "kyun aap"],
    reply: "Kyun Tousif? Suno! 😊\n\n⭐ 7+ years experience\n✅ 100+ successful projects\n🌍 International clients\n💬 Direct communication — no middlemen\n🚀 Fast delivery\n🔒 Post-delivery support\n💰 Competitive pricing\n🇵🇰 Pakistani — local problems ki samajh\n\nEk baar baat karo — khud fark mehsoos hoga! Aapko kya specific chahiye jo Tousif mein dekhna chahte ho? 🤔",
    showWhatsApp: true,
  },
  {
    keywords: ["social media", "facebook", "instagram", "tiktok", "youtube", "page", "social"],
    reply: "Social media ki baat aa gayi! 📱\n\nTousif web development mein expert hai toh yeh kar sakta hai:\n✅ Social media links website mein add karna\n✅ Facebook Pixel integration\n✅ Instagram feed website pe show karna\n✅ Open Graph tags (social sharing preview)\n\nFull social media management ke liye alag expert ki zaroorat hogi.\nAapko website mein social integration chahiye? 😊",
  },
  {
    keywords: ["shopify", "shopify store", "dropshipping", "drop shipping"],
    reply: "Shopify ya WooCommerce? Yeh debate hai! 😄\n\nPakistan mein WooCommerce better hai:\n✅ One-time cost, full control, no monthly fee\n❌ Shopify mein $29–$299/month + transaction fees\n\nTousif WooCommerce ka expert hai! Aapko store chahiye toh WooCommerce best rahega.\nKya type ka store khulwana chahte ho? 👀",
  },
  {
    keywords: ["slow", "loading", "speed", "lagging", "hang", "late", "dhheela", "jaldi nahi khulti"],
    reply: "Website slow hai? Yeh common problem hai! 😅\n\nWajuhaat:\n❌ Unoptimized images\n❌ Slow hosting\n❌ Zyada plugins\n❌ No caching\n\nTousif fix kar sakta hai:\n✅ 90+ PageSpeed score\n✅ Image compression\n✅ Caching setup (LiteSpeed/WP Rocket)\n✅ CDN integration\n\nAbhi WhatsApp karo — analysis free hai! 👇😊",
    showWhatsApp: true,
  },
  {
    keywords: ["hack", "hacked", "virus", "malware", "warning", "suspend", "remove", "clean", "security issue"],
    reply: "🚨 Hacked ho gayi website? Ghabrao mat!\n\nTousif help karega:\n✅ Malware removal\n✅ Security hardening\n✅ Backdoor removal\n✅ Firewall installation\n✅ 2FA setup\n\nEmergency response — usually 1-2 hours mein fix! ⚡\n\nAbhi WhatsApp karo — jitni jaldi utna behtar! 👇😊",
    showWhatsApp: true,
  },
  {
    keywords: ["wordpress better", "custom better", "konsa better", "wordpress ya", "ya custom", "konsa choose"],
    reply: "WordPress vs Custom — yeh sawaal aksar aata hai! 🤔\n\n🏆 WordPress — best for:\n✅ Budget-friendly\n✅ Fast delivery\n✅ Khud manage kar sakte ho\n✅ 45% websites use karti hain\n\n⚙️ Custom — best for:\n✅ Unique complex features\n✅ High traffic\n✅ Specific business logic\n\nPakistan mein 90% businesses ke liye WordPress perfect hai! Tousif dono kar sakta hai.\nAapka project kis taraf jhuk raha hai? 😊",
  },
  // RESTAURANT / CAFE
  {
    keywords: ["restaurant", "cafe", "food", "dhaba", "menu", "online order", "khana", "biryani", "fast food", "pizza"],
    reply: "Restaurant ya cafe ke liye website chahiye? Zabardast! 🍽️\n\nTousif restaurant websites mein yeh sab include karta hai:\n🍕 Online menu display\n🛒 Online ordering system\n📍 Google Maps location\n⭐ Customer reviews\n📞 Table reservation\n\nBudget PKR 30,000–80,000 mein complete website ban jati hai!\n\nKoi specific dish ya cuisine based restaurant hai? Ya general hai? 👀😊",
    showWhatsApp: true,
  },
  // REAL ESTATE
  {
    keywords: ["real estate", "property", "plot", "house", "makan", "zameen", "apartment", "flat", "rent", "sale property", "property dealer"],
    reply: "Real estate portal banwana chahte ho? Tousif ki specialty hai! 🏠\n\n✅ Property listings with search & filter\n✅ Location-based property search\n✅ Property gallery & virtual tour\n✅ WhatsApp inquiry button\n✅ Agent profiles\n\nPKR 50,000–150,000 mein professional portal ban jata hai!\n\nProperties aapki hain ya agents ke sath kaam karte ho? 🤔",
    showWhatsApp: true,
  },
  // SCHOOL / ACADEMY
  {
    keywords: ["school", "academy", "college", "university", "madrasa", "institute", "tuition", "coaching", "education", "course", "admission"],
    reply: "Educational institute ke liye website chahiye? Bilkul banao! 🎓\n\n✅ Course listings\n✅ Online admission forms\n✅ Teacher profiles\n✅ Events & gallery\n✅ Notice board\n✅ Fee payment integration\n\nPKR 40,000–120,000 mein complete site!\n\nSchool hai ya coaching centre? Kitne courses hain? 😊",
    showWhatsApp: true,
  },
  // MEDICAL / CLINIC
  {
    keywords: ["medical", "clinic", "doctor", "hospital", "pharmacy", "health", "dawakhana", "appointment", "hakeem", "dawa"],
    reply: "Clinic ya hospital website? Yeh toh important hai! 🏥\n\n✅ Doctor profiles & specializations\n✅ Online appointment booking\n✅ Services listing\n✅ Patient testimonials\n✅ Emergency contact button\n✅ WhatsApp consultation\n\nPKR 35,000–100,000 mein professional medical website!\n\nClinic hai ya hospital? Kitne doctors hain? 👨‍⚕️😊",
    showWhatsApp: true,
  },
  // TRAVEL AGENCY
  {
    keywords: ["travel", "tour", "agency", "hajj", "umrah", "trip", "package", "visa", "ticketing", "tourism", "sair"],
    reply: "Travel agency website! Bohat acha kaam hai yeh! ✈️\n\n✅ Tour packages display\n✅ Online booking form\n✅ Hajj/Umrah packages\n✅ Visa info pages\n✅ Photo gallery\n✅ WhatsApp inquiry\n\nPKR 40,000–100,000 mein complete travel website!\n\nDomestic tours hain ya international? Packages fixed hain ya custom? 🌍😊",
    showWhatsApp: true,
  },
  // BACKUP
  {
    keywords: ["backup", "data loss", "data safe", "website save", "restore", "crash", "delete ho gaya"],
    reply: "Backup ki baat — yeh sab se important cheez hai! 💾\n\nTousif har project mein backup setup karta hai:\n✅ Daily/weekly auto backups\n✅ Cloud backup (Google Drive/Dropbox)\n✅ One-click restore\n✅ Database backup separate\n\nYeh karo na — aaj hi backup check karo. Data lost hua toh bada nuqsan hota hai! 🔒\n\nAapke paas backup hai currently? 🤔",
  },
  // BUSINESS EMAIL
  {
    keywords: ["email", "business email", "company email", "gmail", "professional email", "info@", "mail setup", "google workspace"],
    reply: "Professional email setup karwana chahte ho? 📧\n\nExample: info@aapkibusiness.com — yeh bohot professional lagta hai!\n\n✅ Google Workspace: PKR 1,500/month\n✅ cPanel email: hosting ke sath free\n✅ Mobile pe bhi setup ho jata hai\n\nTousif setup kar deta hai — aapko kuch nahi karna! 😊\nAapke paas already domain hai? 🤔",
  },
  // SSL CERTIFICATE
  {
    keywords: ["ssl", "https", "secure", "lock", "certificate", "not secure", "warning browser", "green lock"],
    reply: "SSL certificate — website ke liye zaroori hai! 🔒\n\nBina SSL ke browser 'Not Secure' dikhata hai — visitors bhaag jaate hain!\n\n✅ Let's Encrypt — bilkul FREE\n✅ Google ranking factor bhi hai\n✅ Tousif installation karta hai\n\nAapki website pe SSL laga hai ya nahi? Check karo! 😊",
  },
  // WEBSITE TRANSFER / MIGRATION
  {
    keywords: ["transfer", "migrate", "migration", "move", "dusri hosting", "hosting change", "purani website", "move website", "copy website"],
    reply: "Hosting change karwana chahte ho? 😊\n\nTousif migration karta hai bina downtime ke:\n✅ Puri website nayi hosting pe move\n✅ Database transfer\n✅ Domain pointing\n✅ Testing after migration\n\nPKR 5,000–15,000 mein complete migration!\n\nKahan se kahan shift karna hai? 😊👇",
    showWhatsApp: true,
  },
  // WORDPRESS ERRORS
  {
    keywords: ["error", "white screen", "500 error", "404", "broken", "kaam nahi kar raha", "open nahi ho raha", "fix karo", "problem", "issue"],
    reply: "Website mein error aa raha hai? Ghabrao mat! 🛠️\n\nTousif roz yeh errors fix karta hai:\n❌ White Screen of Death\n❌ 500 Internal Server Error\n❌ 404 Page Not Found\n❌ Database connection error\n❌ Plugin conflict\n\nUsually 1-3 hours mein fix ho jata hai! ⚡\n\nKya error aa raha hai exactly? WhatsApp pe screenshot bhejo! 👇😊",
    showWhatsApp: true,
  },
  // INSTALLMENT
  {
    keywords: ["installment", "qist", "monthly", "kiraye", "partial", "thora thora", "parts mein", "advance kam"],
    reply: "Installment plan chahiye? Possible hai! 😊\n\n💳 Standard: 50% advance + 50% delivery\n💳 Special: 40% + 30% + 30%\n\nBade projects (PKR 100,000+) ke liye 3 installments bhi ho sakte hain.\n\nTousif samajhta hai — client ki zaroorat pehle!\nAapka budget kya hai aur project kya hai? 👇",
    showWhatsApp: true,
  },
  // PEHLE DESIGN DIKAO
  {
    keywords: ["pehle design", "mockup pehle", "design dikao", "pehle sample", "wireframe", "design approval", "pehle dekhna"],
    reply: "Pehle design dekhna chahte ho? Bilkul! 😊\n\nTousif ka process:\n1️⃣ 50% advance lo\n2️⃣ Homepage design banao\n3️⃣ Aapko dikhaao — approval lo\n4️⃣ Phir baaki pages banao\n\nAap har step pe control mein ho. Koi surprise nahi!\n\nKya aapke zehan mein koi sample/reference website hai? 👀",
  },
  // REFERENCE / RECOMMENDATIONS
  {
    keywords: ["reference", "recommendation", "koi jaanta", "referral", "kisne bataya", "reviews", "feedback", "purane client"],
    reply: "Log kya kehte hain Tousif ke baare mein? Suno! 😊\n\n⭐ '100% professional, time pe delivery'\n⭐ 'Best WordPress developer in Pakistan'\n⭐ 'Communication excellent hai'\n⭐ 4.5+ Fiverr rating with real reviews\n\nUSA, UK, Germany, Greece — sab jagah se clients ne trust kiya!\n\nFiverr pe @mr_tousifqasim search karo — reviews khud parh lo! 😊",
  },
  // BHAI RATE KAM KARO
  {
    keywords: ["bhai", "yaar", "dost", "kam karo", "aur kam", "price ghatao", "ziada hai", "mera budget", "itna nahi hai", "thora aur"],
    reply: "Bhai samajh aata hai! 😊\n\nYeh kar sakte hain price kam karne ke liye:\n✅ Features thori kam karo — price kam ho jayega\n✅ Template use karo custom ki jagah — save PKR 20,000+\n✅ Content aap khud do — save PKR 5,000–10,000\n✅ Phased development — pehle basic, baad mein features\n\nBudget batao — zaroor koi rasta nikalenge! 👇😊",
    showWhatsApp: true,
  },
  // STUDENT DISCOUNT
  {
    keywords: ["student", "fresh", "naya", "abhi start", "startup", "beginners", "new business", "university", "college student", "padhai"],
    reply: "Student ho ya startup? Special discount hai! 🎓\n\n✅ 15-20% student discount\n✅ Flexible payment\n✅ Basic package from PKR 15,000\n✅ Free domain suggestion\n✅ Guidance bhi milti hai\n\nApna student ID ya startup idea share karo — best deal milegi! 😊\nWhatsApp karo 👇",
    showWhatsApp: true,
  },
  // GUARANTEE
  {
    keywords: ["guarantee", "warranty", "kya guarantee", "pakka", "confirm", "sure", "100%", "promise", "assured"],
    reply: "Tousif ki guarantee suno! 💯\n\n✅ 7 din free bug fixing after delivery\n✅ Jo features agree hue — woh zaroor honge\n✅ Delivery time pakka\n✅ Regular progress updates\n✅ Pasand na aaye toh revision milegi\n✅ 100+ satisfied clients — proof hai!\n\n'Quality is not an option — it's a standard!' 😊",
  },
  // CONTRACT / AGREEMENT
  {
    keywords: ["contract", "agreement", "written", "document", "legal", "black white", "likhit", "sign", "paper"],
    reply: "Written agreement chahiye? Haan milti hai! 📋\n\n✅ Project scope clearly likha hota hai\n✅ Delivery date confirm\n✅ Payment terms\n✅ Revision policy\n✅ NDA (if required)\n\nYeh dono parties ko protect karta hai. Tousif professional hai — sab kuch transparent!\n\nKya aapko NDA bhi chahiye? 🤔",
  },
  // DUSRE NE SASTA BATAYA
  {
    keywords: ["dusre ne", "kisi ne", "sasta mila", "aur sasta", "woh kam mein", "competitor sasta", "itna kyun", "woh deta"],
    reply: "Compare karo bilkul! Lekin yeh socho: 🤔\n\n⚠️ Sasta developer = hidden risks:\n❌ Poor code quality\n❌ No support after delivery\n❌ Copy-paste themes\n❌ Security issues\n\n✅ Tousif ke sath:\n✅ 7+ years, 100+ projects\n✅ Proper support & quality\n✅ Original work\n\nEk Lahore company ne PKR 15,000 mein website banwayi — 3 months baad PKR 85,000 mein fix karwani pari! 😅\n\nSahi investment pehli baar karo! 💯",
  },
  // AGENCY VS FREELANCER
  {
    keywords: ["agency", "company", "freelancer", "kaun better", "firm", "individual", "solo", "team"],
    reply: "Agency vs Freelancer — yeh aksar confusion hoti hai! 😊\n\n🏢 Agency:\n✅ Team hai\n❌ Expensive, middlemen involved\n\n👨‍💻 Tousif (Expert Freelancer):\n✅ Direct baat hoti hai\n✅ Better pricing\n✅ Personal attention\n✅ Faster decisions\n✅ 7+ years, 100+ projects\n\nAap directly expert se kaam karwate ho — no middlemen! Kya lagta hai aapko? 🤔",
  },
  // PART TIME YA FULL TIME
  {
    keywords: ["part time", "full time", "available", "kitna time", "busy", "aur kaam", "dedicated", "sirf mera", "focus"],
    reply: "Availability ki baat karte hain! ⏰\n\n⏰ Monday–Saturday available\n📞 Response time: 1-2 hours (WhatsApp)\n🚀 Limited projects liye jaate hain — quality ke liye\n✅ Aapke project ko proper time milega\n📊 Regular daily/weekly updates\n\nAapka project priority hoga — yeh Tousif ka commitment hai! 💪\nAapko kab tak chahiye roughly? 📅",
  },
  {
    keywords: ["menu", "back", "main menu", "go back", "wapis", "home", "topics", "options", "list"],
    reply: "Yeh lo main menu — jo topic chahiye select karo! 👇\n\n1️⃣ Services & Pricing\n2️⃣ WordPress & WooCommerce\n3️⃣ Hotel / STR Websites\n4️⃣ WHMCS & Hosting\n5️⃣ Experience & Portfolio\n6️⃣ Process & Support\n7️⃣ Emergency Help 🚨\n8️⃣ Contact / Hire\n\nNumber type karo ya topic ka naam likho! 😊",
  },
  {
    keywords: ["restart", "start over", "reset", "fresh", "new chat", "dubara", "clear", "restart chat"],
    reply: "Fresh start karte hain! 👋 Naya sawaal poochho — main jawab dunga! 😊",
    isRestart: true,
  },
  {
    keywords: [],
    reply: "Mujhe samajh nahi aaya aapka sawaal 😅\n\nLekin Tousif personally aapki madad kar sakta hai! WhatsApp pe message karo — usually 1-2 ghante mein reply aata hai.\n\nYa upar menu se koi topic select karo! 👇😊",
    showWhatsApp: true,
    isDefault: true,
  },
]

function getBotReply(userInput) {
  const input = userInput.toLowerCase()
  for (const item of knowledgeBase) {
    if (item.isDefault) continue
    const matched = item.keywords.some((keyword) => input.includes(keyword))
    if (matched) return item
  }
  return knowledgeBase.find((item) => item.isDefault)
}

function TypingDots() {
  return (
    <div className="flex items-end gap-2.5 px-4 mb-0.5">
      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/20">
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 10.5h-1V8c0-1.1-.9-2-2-2h-2V4.5c0-.83-.67-1.5-1.5-1.5S13 3.67 13 4.5V6h-2V4.5c0-.83-.67-1.5-1.5-1.5S8 3.67 8 4.5V6H6c-1.1 0-2 .9-2 2v2.5H3c-.55 0-1 .45-1 1s.45 1 1 1h1V16c0 1.1.9 2 2 2h2v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V18h2v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V18h2c1.1 0 2-.9 2-2v-2.5h1c.55 0 1-.45 1-1s-.45-1-1-1z"/>
        </svg>
      </div>
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl rounded-bl-md px-4 py-3 border border-gray-700/50">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "200ms" }} />
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "400ms" }} />
        </div>
      </div>
    </div>
  )
}

function TypewriterText({ text, isActive, speed }) {
  const [displayed, setDisplayed] = useState("")
  const idxRef = useRef(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!isActive) {
      setDisplayed(text)
      return
    }
    idxRef.current = 0
    setDisplayed("")
    const chars = text
    const step = 2
    const interval = speed || Math.max(8, Math.min(25, Math.floor(600 / chars.length)))

    const animate = () => {
      if (idxRef.current < chars.length) {
        const next = Math.min(idxRef.current + step, chars.length)
        setDisplayed(chars.slice(0, next))
        idxRef.current = next
        rafRef.current = requestAnimationFrame(() => setTimeout(animate, interval))
      }
    }
    rafRef.current = requestAnimationFrame(() => setTimeout(animate, interval))
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [text, isActive])

  return <>{displayed}</>
}

function ChatMessage({ msg, isFirstBot, isLatestBot }) {
  const isUser = msg.from === "user"
  const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  const showAvatar = !isUser ? isFirstBot : true
  return (
    <div className={`flex items-end gap-2.5 px-4 ${isUser ? "flex-row-reverse" : ""} mb-2`}>
      {showAvatar ? (
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg ${
          isUser
            ? "bg-gradient-to-br from-purple-500 to-pink-500 shadow-purple-500/20"
            : "bg-gradient-to-br from-purple-500 to-indigo-600 shadow-purple-500/20"
        }`}>
          {isUser ? (
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 10.5h-1V8c0-1.1-.9-2-2-2h-2V4.5c0-.83-.67-1.5-1.5-1.5S13 3.67 13 4.5V6h-2V4.5c0-.83-.67-1.5-1.5-1.5S8 3.67 8 4.5V6H6c-1.1 0-2 .9-2 2v2.5H3c-.55 0-1 .45-1 1s.45 1 1 1h1V16c0 1.1.9 2 2 2h2v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V18h2v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V18h2c1.1 0 2-.9 2-2v-2.5h1c.55 0 1-.45 1-1s-.45-1-1-1z"/>
            </svg>
          )}
        </div>
      ) : (
        <div className="w-7 h-7 flex-shrink-0" />
      )}
      <div className="max-w-[78%] group">
        <div className={`px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
          isUser
            ? "bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-2xl rounded-br-md shadow-lg shadow-purple-500/20"
            : "bg-gray-800/80 backdrop-blur-sm text-gray-100 rounded-2xl rounded-bl-md border border-gray-700/50 shadow-lg"
        }`}>
          {isUser ? msg.text : <TypewriterText text={msg.text} isActive={isLatestBot && !msg.done} speed={msg.speed} />}
        </div>
        <div className={`flex items-center gap-1.5 mt-1 ${isUser ? "justify-end" : "justify-start"}`}>
          <span className="text-[10px] text-gray-500">{time}</span>
          {isUser && (
            <svg viewBox="0 0 16 11" className="w-3 h-2 fill-purple-400" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.071.653a.457.457 0 00-.304-.102.493.493 0 00-.381.178l-6.19 7.636-2.011-2.095a.463.463 0 00-.336-.153.454.454 0 00-.34.143.505.505 0 00-.14.344c0 .129.046.253.14.344l2.353 2.451c.1.1.223.15.35.15.143 0 .28-.063.375-.178l6.53-8.048a.531.531 0 00.115-.344.507.507 0 00-.161-.326m1.178 2.228a.453.453 0 00-.287-.113.477.477 0 00-.366.168l-3.847 4.746-.646.803 1.198 1.246c.099.1.221.15.348.15.143 0 .28-.063.375-.178l3.43-4.223a.53.53 0 00.117-.344.507.507 0 00-.16-.326z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  )
}

const WHATSAPP_MESSAGE = "Hi Tousif! I visited your portfolio and I'm interested in your services. Can we discuss my project?"

const menuTree = [
  {
    title: "🛠️ Services & Pricing",
    questions: [
      { label: "What services do you offer?", keyword: "services" },
      { label: "Pricing in USD?", keyword: "pricing" },
      { label: "Pricing in PKR?", keyword: "pkr" },
      { label: "Discount or negotiation?", keyword: "sasta" },
    ],
  },
  {
    title: "🌐 WordPress & WooCommerce",
    questions: [
      { label: "WordPress experience?", keyword: "wordpress" },
      { label: "WooCommerce stores?", keyword: "woocommerce" },
      { label: "Shopify vs WooCommerce?", keyword: "shopify" },
      { label: "WordPress ya Custom?", keyword: "wordpress better" },
    ],
  },
  {
    title: "🏨 Hotel / STR Websites",
    questions: [
      { label: "Hotel booking sites?", keyword: "hotel" },
      { label: "API integrations?", keyword: "api" },
    ],
  },
  {
    title: "🔧 WHMCS & Hosting",
    questions: [
      { label: "WHMCS services?", keyword: "whmcs" },
      { label: "Hosting & domain?", keyword: "hosting" },
    ],
  },
  {
    title: "📋 Experience & Portfolio",
    questions: [
      { label: "Work experience?", keyword: "experience" },
      { label: "Portfolio / examples?", keyword: "portfolio" },
    ],
  },
  {
    title: "⏱️ Process & Support",
    questions: [
      { label: "How it works?", keyword: "process" },
      { label: "Delivery time?", keyword: "time" },
      { label: "Post-delivery support?", keyword: "support" },
      { label: "Maintenance packages?", keyword: "maintenance" },
    ],
  },
  {
    title: "💳 Payment & Trust",
    questions: [
      { label: "Payment methods?", keyword: "payment" },
      { label: "Advance safe? Fraud?", keyword: "advance" },
      { label: "Refund policy?", keyword: "refund" },
      { label: "NDA / confidentiality?", keyword: "nda" },
    ],
  },
  {
    title: "📞 Contact & Hire",
    questions: [
      { label: "Contact & hire Tousif?", keyword: "hire" },
    ],
  },
]

function buildTopMenu() {
  return "🤖 Main Menu — what would you like to know?\n\n" +
    menuTree.map((cat, i) => `${i + 1}. ${cat.title}`).join("\n") +
    "\n\nType a number to browse questions 🔢"
}

function buildCategoryMenu(catIndex) {
  const cat = menuTree[catIndex]
  return cat.title + "\n\n" +
    cat.questions.map((q, i) => `${i + 1}. ${q.label}`).join("\n") +
    '\n\nType a number for the answer  🔢\n🔙 Type "back" for main menu'
}

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showWhatsApp, setShowWhatsApp] = useState(false)
  const [menuMode, setMenuMode] = useState(null)
  const [menuCategory, setMenuCategory] = useState(0)
  const [unreadCount, setUnreadCount] = useState(0)
  const [showScrollBtn, setShowScrollBtn] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const messagesContainerRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    setShowScrollBtn(false)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  useEffect(() => {
    const el = messagesContainerRef.current
    if (!el) return
    const observer = new ResizeObserver(() => {
      const dist = el.scrollHeight - el.scrollTop - el.clientHeight
      if (dist <= 120) scrollToBottom()
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [scrollToBottom])

  useEffect(() => {
    const alreadyOpened = sessionStorage.getItem("chat_auto_opened")
    if (!alreadyOpened) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        setUnreadCount(0)
        sessionStorage.setItem("chat_auto_opened", "true")
      }, 5500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleScroll = useCallback(() => {
    const el = messagesContainerRef.current
    if (el) {
      const dist = el.scrollHeight - el.scrollTop - el.clientHeight
      setShowScrollBtn(dist > 120)
    }
  }, [])

  const openChat = () => {
    setIsOpen(true)
    setUnreadCount(0)
  }

  const closeChat = () => {
    setIsOpen(false)
  }

  const addBotReply = (reply, showWABtn, isRestart, menuState) => {
    setIsTyping(true)
    const delay = Math.min(2200, Math.max(600, reply.length * 20))
    setTimeout(() => {
      setIsTyping(false)
      if (isRestart) {
        setMessages([])
        setMenuMode(null)
        setShowWhatsApp(false)
        setIsTyping(true)
        setTimeout(() => {
          const welcome = knowledgeBase[0]
          const speed = Math.max(8, Math.min(25, Math.floor(600 / welcome.reply.length)))
          setIsTyping(false)
          setMessages([{ from: "bot", text: welcome.reply, timestamp: Date.now(), speed, done: false }])
        }, Math.min(2200, Math.max(600, welcome.reply.length * 20)))
      } else {
        const speed = Math.max(8, Math.min(25, Math.floor(600 / reply.length)))
        setMessages((prev) => [...prev, { from: "bot", text: reply, timestamp: Date.now(), speed, done: false }])
        if (!isOpen) setUnreadCount((c) => c + 1)
        if (showWABtn) setShowWhatsApp(true)
        if (menuState) {
          setMenuMode(menuState.mode)
          setMenuCategory(menuState.category)
        } else {
          setMenuMode(null)
        }
      }
    }, delay)
  }

  useEffect(() => {
    if (isOpen && messages.length === 0 && !isTyping) {
      setTimeout(() => {
        const welcome = knowledgeBase[0]
        const speed = Math.max(8, Math.min(25, Math.floor(600 / welcome.reply.length)))
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
          setMessages([{ from: "bot", text: welcome.reply, timestamp: Date.now(), speed, done: false }])
        }, Math.min(2200, Math.max(600, welcome.reply.length * 20)))
      }, 400)
    }
  }, [isOpen])

  const quickTopics = [
    { label: "Services", keywords: "services" },
    { label: "Pricing", keywords: "pricing" },
    { label: "Portfolio", keywords: "portfolio" },
    { label: "Hire Me", keywords: "hire" },
    { label: "🔙 Menu", keywords: "menu" },
    { label: "🔄 New Chat", keywords: "restart" },
  ]

  const sendButtonClick = (label, keywords) => {
    setMessages((prev) => [...prev, { from: "user", text: label, timestamp: Date.now() }])
    const match = getBotReply(keywords)
    if (match.isDefault && keywords !== "menu" && keywords !== "restart") {
      addBotReply(buildTopMenu(), false, false, { mode: "top", category: 0 })
    } else {
      addBotReply(match.reply, match.showWhatsApp, match.isRestart)
    }
  }

  const sendNumberClick = (num, label) => {
    setMessages((prev) => [...prev, { from: "user", text: num, timestamp: Date.now() }])
    if (menuMode === "top") {
      const catIndex = parseInt(num) - 1
      const cat = menuTree[catIndex]
      if (cat) addBotReply(buildCategoryMenu(catIndex), false, false, { mode: "category", category: catIndex })
    } else if (menuMode === "category") {
      const cat = menuTree[menuCategory]
      const qIndex = parseInt(num) - 1
      if (cat && cat.questions[qIndex]) {
        setMenuMode(null)
        const match = getBotReply(cat.questions[qIndex].keyword)
        addBotReply(match.reply, match.showWhatsApp, match.isRestart)
      }
    }
  }

  const whatsappUrl = `https://wa.me/923286477314?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  const handleSend = () => {
    const text = inputValue.trim()
    if (!text || isTyping) return
    setMessages((prev) => [...prev, { from: "user", text, timestamp: Date.now() }])
    setInputValue("")

    if (menuMode === "top" && /^[1-8]$/.test(text)) {
      const catIndex = parseInt(text) - 1
      const cat = menuTree[catIndex]
      if (cat) { addBotReply(buildCategoryMenu(catIndex), false, false, { mode: "category", category: catIndex }); return }
    }
    if (menuMode === "category" && /^[1-9]$/.test(text)) {
      const cat = menuTree[menuCategory]
      const qIndex = parseInt(text) - 1
      if (cat && cat.questions[qIndex]) { setMenuMode(null); const match = getBotReply(cat.questions[qIndex].keyword); addBotReply(match.reply, match.showWhatsApp, match.isRestart); return }
    }

    const match = getBotReply(text)
    if (match.isDefault) {
      addBotReply(buildTopMenu(), false, false, { mode: "top", category: 0 })
    } else {
      addBotReply(match.reply, match.showWhatsApp, match.isRestart)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <div className="relative opacity-0 translate-x-4 animate-fade-in-up group-hover:opacity-100 transition-all duration-300 hidden md:block" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
          <div className="bg-white text-gray-800 text-sm font-medium px-4 py-2 rounded-xl shadow-lg relative whitespace-nowrap">
            Chat with me 💬
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45" />
          </div>
        </div>
        <button
          onClick={openChat}
          className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group cursor-pointer"
          aria-label="Open chat"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] animate-ping opacity-20 group-hover:opacity-30" />
          {unreadCount > 0 && (
            <div className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg z-20 px-1">
              <span className="text-white text-[10px] font-bold">{unreadCount > 9 ? "9+" : unreadCount}</span>
            </div>
          )}
          <div className="absolute inset-0 rounded-2xl bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
          <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-7 md:h-7 fill-white relative z-10" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 10.5h-1V8c0-1.1-.9-2-2-2h-2V4.5c0-.83-.67-1.5-1.5-1.5S13 3.67 13 4.5V6h-2V4.5c0-.83-.67-1.5-1.5-1.5S8 3.67 8 4.5V6H6c-1.1 0-2 .9-2 2v2.5H3c-.55 0-1 .45-1 1s.45 1 1 1h1V16c0 1.1.9 2 2 2h2v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V18h2v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V18h2c1.1 0 2-.9 2-2v-2.5h1c.55 0 1-.45 1-1s-.45-1-1-1zm-13 0c-.83 0-1.5-.67-1.5-1.5S7.17 7.5 8 7.5s1.5.67 1.5 1.5S8.83 10.5 8 10.5zm8 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-4 5c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z"/>
          </svg>
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="w-[360px] h-[520px] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col animate-slide-up border border-gray-700/30">
        <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 px-4 py-3 flex items-center gap-3 flex-shrink-0 border-b border-gray-700/30">
          <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/20">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 10.5h-1V8c0-1.1-.9-2-2-2h-2V4.5c0-.83-.67-1.5-1.5-1.5S13 3.67 13 4.5V6h-2V4.5c0-.83-.67-1.5-1.5-1.5S8 3.67 8 4.5V6H6c-1.1 0-2 .9-2 2v2.5H3c-.55 0-1 .45-1 1s.45 1 1 1h1V16c0 1.1.9 2 2 2h2v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V18h2v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V18h2c1.1 0 2-.9 2-2v-2.5h1c.55 0 1-.45 1-1s-.45-1-1-1z"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-sm">AI Assistant</h3>
            <p className="text-gray-400 text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full inline-block animate-pulse" />
              Online — Ask me anything
            </p>
          </div>
          <button
            onClick={closeChat}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all flex-shrink-0 border border-gray-600/30"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gray-400" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        <div ref={messagesContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto py-4 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 custom-scrollbar relative">
          {showScrollBtn && (
            <button
              onClick={scrollToBottom}
              className="sticky bottom-2 mx-auto z-10 w-8 h-8 rounded-full bg-purple-600/80 hover:bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/20 backdrop-blur-sm border border-purple-400/30 transition-all"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
              </svg>
            </button>
          )}
          {messages.map((msg, i) => {
            const prev = messages[i - 1]
            const isFirstBot = msg.from === "bot" && (!prev || prev.from !== "bot")
            return <ChatMessage key={i} msg={msg} isLast={i === messages.length - 1} isFirstBot={isFirstBot} />
          })}
          {isTyping && <TypingDots />}
          {showWhatsApp && !isTyping && (
            <div className="px-4 py-4 flex justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all border border-purple-400/20"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
              <button
                onClick={() => sendButtonClick("🔙 Menu", "menu")}
                className="ml-2 px-3.5 py-3 rounded-xl border border-purple-500/30 text-purple-300 bg-purple-500/5 hover:bg-purple-500/20 hover:text-white text-xs transition-all"
              >
                🔙 Menu
              </button>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="px-3 py-2.5 bg-gray-900/95 border-t border-gray-700/30 flex-shrink-0">
          {isTyping ? null : showWhatsApp ? null : menuMode === "top" || menuMode === "category" ? (
            <div className="flex flex-wrap gap-1.5 justify-center max-h-[80px] overflow-y-auto mb-2 custom-scrollbar">
              {menuMode === "top" ? (
                <>
                  {menuTree.map((cat, i) => (
                    <button key={i} onClick={() => sendNumberClick(`${i + 1}`, cat.title)}
                      className="bg-purple-500/10 hover:bg-purple-500/25 text-purple-300 hover:text-white border border-purple-500/25 rounded-xl px-3 py-2 text-xs transition-all cursor-pointer leading-snug">
                      <span className="font-bold text-purple-400">{i + 1}.</span> {cat.title}
                    </button>
                  ))}
                  <button onClick={() => sendButtonClick("🔄 New Chat", "restart")}
                    className="w-full mt-1 border border-gray-600/40 text-gray-400 hover:text-white hover:border-gray-500 rounded-xl px-3 py-1.5 text-xs transition-all cursor-pointer">
                    🔄 Start Over
                  </button>
                </>
              ) : (
                <>
                  {menuTree[menuCategory]?.questions.map((q, i) => (
                    <button key={i} onClick={() => sendNumberClick(`${i + 1}`, q.label)}
                      className="bg-purple-500/10 hover:bg-purple-500/25 text-purple-300 hover:text-white border border-purple-500/25 rounded-xl px-3 py-2 text-xs transition-all cursor-pointer leading-snug">
                      <span className="font-bold text-purple-400">{i + 1}.</span> {q.label}
                    </button>
                  ))}
                  <button onClick={() => sendButtonClick("🔙 Menu", "menu")}
                    className="bg-gray-700/40 hover:bg-gray-600/60 text-gray-300 hover:text-white border border-gray-600/30 rounded-xl px-3 py-1.5 text-xs transition-all cursor-pointer">
                    🔙 Back
                  </button>
                </>
              )}
            </div>
          ) : (
            !isTyping && !showWhatsApp && messages.length > 0 && (
              <div className="flex flex-wrap gap-1.5 justify-center mb-2">
                {quickTopics.map((t) => (
                  <button key={t.label} onClick={() => sendButtonClick(t.label, t.keywords)}
                    className="border border-purple-500/30 text-purple-300 bg-purple-500/5 hover:bg-purple-500/20 hover:text-white hover:border-purple-400/50 rounded-xl px-3.5 py-1.5 text-xs transition-all cursor-pointer">
                    {t.label}
                  </button>
                ))}
              </div>
            )
          )}
          <div className="flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-gray-700/50">
            <input ref={inputRef} type="text" value={inputValue}
              onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown}
              placeholder="Type your message..." disabled={isTyping}
              className="flex-1 text-sm outline-none bg-transparent text-gray-200 placeholder-gray-500" />
            <button onClick={handleSend} disabled={!inputValue.trim() || isTyping}
              className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all flex-shrink-0 shadow-lg shadow-purple-500/20">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white ml-0.5" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
