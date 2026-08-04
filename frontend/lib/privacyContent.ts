export const PRIVACY_POLICY_VERSION = '2026-08-03'

export type PrivacySection = {
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

export type PrivacyLocale = {
  pageTitle: string
  lastUpdated: string
  intro: string
  sections: PrivacySection[]
  contactHeading: string
  contactBody: string
}

const emailAddress = process.env.NEXT_PUBLIC_PRIVACY_CONTACT_EMAIL

export const privacyContactEmail = emailAddress && emailAddress.trim().length > 0 ? emailAddress.trim() : null

export const privacyContent: { he: PrivacyLocale; en: PrivacyLocale } = {
  he: {
    pageTitle: 'מדיניות פרטיות',
    lastUpdated: 'עודכן לאחרונה: 3 באוגוסט 2026',
    intro:
      'INNERSKY, עסק בבעלות עדי פרהודי מרגוליס (להלן: "INNERSKY", "אנחנו"), מכבדת את פרטיות המשתמשים באתר. מדיניות זו מסבירה איזה מידע אישי עשוי להיאסף בעת השימוש באתר ובפנייה אלינו, לאילו מטרות נעשה בו שימוש, למי הוא עשוי להימסר, כמה זמן הוא נשמר ומהן זכויותיכם. השימוש באתר ובטופס יצירת הקשר כפוף למדיניות זו ולהוראות הדין החל, ובכלל זה חוק הגנת הפרטיות, התשמ"א-1981, כפי שתוקן מעת לעת, ותקנות הגנת הפרטיות (אבטחת מידע), התשע"ז-2017.',
    sections: [
      {
        title: '1. כללי',
        paragraphs: [
          'מדיניות זו חלה על השימוש באתר INNERSKY ועל כל פנייה המבוצעת באמצעות טופס יצירת הקשר. המסמך מנוסח בלשון זכר מטעמי נוחות בלבד ומתייחס לכל המגדרים.',
        ],
      },
      {
        title: '2. בעלת השליטה במידע ויצירת קשר',
        paragraphs: [
          'בעלת השליטה במידע שנאסף באמצעות האתר היא INNERSKY, בבעלות עדי פרהודי מרגוליס. בכל שאלה בנושא פרטיות, או לצורך מימוש זכות עיון, תיקון או מחיקה, ניתן לפנות באמצעות טופס יצירת הקשר באתר או בכתובת הדוא"ל הייעודית לפרטיות המופיעה לצד הטופס ובפוטר האתר.',
        ],
      },
      {
        title: '3. המידע שאנו אוספים',
        paragraphs: ['אנו עשויים לאסוף את סוגי המידע הבאים:'],
        bullets: [
          'מידע שנמסר בטופס: שם מלא, כתובת דוא"ל, מספר טלפון אם נמסר, שם חברה אם נמסר, נושא ותוכן הפנייה.',
          'מידע הנוצר במסגרת הקשר עמנו: תכתובות, סיכומי שיחות, בקשות, הצעות והיסטוריית טיפול בפנייה.',
          'מידע טכני בסיסי הנאסף לצורך תפעול ואבטחת האתר, כגון כתובת IP, סוג דפדפן, זמני גישה, נתוני שגיאה ואירועי אבטחה, ככל שנאסף בפועל על ידי תשתיות האתר.',
          'מידע סטטיסטי או נתוני שימוש, רק אם הופעל באתר כלי אנליטיקה ובהתאם לבחירות המשתמש במנגנון העוגיות.',
        ],
      },
      {
        title: '4. האם חובה למסור את המידע',
        paragraphs: [
          'מסירת המידע בטופס תלויה ברצונכם ובהסכמתכם, ולא חלה עליכם חובה חוקית למסור אותו. ללא הפרטים המסומנים כחובה, לא נוכל לזהות את הפנייה, להשיב לה או לטפל בה באופן מעשי.',
          'אין בכוונתנו לאסוף באמצעות טופס יצירת הקשר מידע בעל רגישות מיוחדת. אנא הימנעו ממסירת מידע רפואי, פיננסי, מספרי זהות או דרכון, פרטי תשלום או מידע רגיש אחר שאינו נחוץ לפנייה.',
        ],
      },
      {
        title: '5. מטרות השימוש במידע',
        bullets: [
          'מענה לפנייה ויצירת קשר לפי בקשת הפונה.',
          'בחינת התאמה לשירותי INNERSKY, הכנת הצעה וניהול המשך הקשר העסקי.',
          'תיעוד הטיפול, ניהול השירות ושיפור תהליכי העבודה.',
          'תפעול האתר, אבטחתו, איתור תקלות, מניעת שימוש לרעה והתגוננות מפני אירועי סייבר.',
          'עמידה בדרישות דין, ניהול מחלוקות והגנה על זכויות משפטיות.',
          'שליחת דיוור שיווקי רק אם ניתנה לכך הסכמה נפרדת כנדרש, ובכפוף לאפשרות הסרה.',
        ],
        paragraphs: [
          'לא נעשה במידע שימוש למטרה שאינה תואמת למטרה שלשמה נמסר, אלא אם נקבל הסכמה מתאימה או שהשימוש מותר או נדרש לפי דין.',
        ],
      },
      {
        title: '6. מסירת מידע לצדדים שלישיים',
        paragraphs: ['אנו לא מוכרים מידע אישי. מידע עשוי להימסר, במידה הנדרשת בלבד, לקטגוריות הבאות:'],
        bullets: [
          'ספקי אחסון, ענן ותשתיות אתר.',
          'ספקי דוא"ל, טפסים, אבטחה, גיבוי ותמיכה טכנית.',
          'יועצים מקצועיים, כגון עורכי דין ורואי חשבון, כאשר הדבר נדרש.',
          'רשויות מוסמכות או צדדים אחרים, כאשר המסירה נדרשת לפי דין, צו, הליך משפטי או לצורך הגנה על זכויות.',
          'גורם שיקבל את פעילות העסק או חלק ממנה במסגרת שינוי מבני, בכפוף להמשך הגנה על המידע.',
        ],
      },
      {
        title: '7. העברת מידע מחוץ לישראל',
        paragraphs: [
          'חלק מספקי התשתית והשירות עשויים לעבד או לאחסן מידע מחוץ לישראל. במקרה כזה נפעל בהתאם לדין החל ונשתמש בהסדרים מתאימים שנועדו להגן על המידע. שימוש באתר ושליחת הטופס עשויים לכלול עיבוד כזה, בהתאם לספקים הפעילים בפועל.',
        ],
      },
      {
        title: '8. שמירת מידע',
        paragraphs: [
          'פנייה שאינה מתפתחת לקשר עסקי תישמר, ככלל, עד 24 חודשים ממועד הטיפול האחרון, ולאחר מכן תימחק או תעבור אנונימיזציה, אלא אם נדרש לשמור אותה לתקופה אחרת לפי דין או לצורך מוצדק, כגון ניהול מחלוקת או הגנה על זכויות. מידע הקשור להתקשרות עסקית יישמר במשך תקופת ההתקשרות ולאחריה לפי דרישות הדין והצרכים העסקיים הלגיטימיים. לוגים טכניים יישמרו לפרקי זמן קצרים ככל האפשר בהתאם לצרכי אבטחה ותפעול.',
        ],
      },
      {
        title: '9. אבטחת מידע',
        paragraphs: [
          'אנו נוקטים אמצעים ארגוניים וטכנולוגיים סבירים ומקובלים לצמצום הסיכון לגישה בלתי מורשית, שימוש לרעה, שינוי, אובדן או חשיפה של מידע. עם זאת, אין מערכת המאובטחת באופן מוחלט, ולכן איננו יכולים להבטיח חסינות מלאה מפני כל אירוע.',
        ],
      },
      {
        title: '10. זכויות ביחס למידע',
        paragraphs: [
          'בכפוף להוראות הדין, אדם זכאי לבקש לעיין במידע אישי המוחזק עליו במאגר מידע. אם המידע אינו נכון, שלם, ברור או מעודכן, ניתן לבקש את תיקונו או מחיקתו. ניתן גם לבקש להפסיק שימוש המבוסס על הסכמה או להסיר הסכמה לדיוור שיווקי. בקשות יוגשו באמצעות פרטי הקשר המפורטים בסעיף 2. לצורך הגנה על פרטיות המבקש, אנו עשויים לבקש פרטים סבירים לאימות זהותו. נבחן כל בקשה ונשיב בהתאם לדין.',
        ],
      },
      {
        title: '11. עוגיות וכלי מדידה',
        paragraphs: [
          'האתר עשוי להשתמש בעוגיות הכרחיות הנדרשות לתפעול, אבטחה ושמירת העדפות בסיסיות. אם יופעלו כלי אנליטיקה, פרסום או מעקב שאינם הכרחיים, הם לא ייטענו לפני שתינתן בחירה מתאימה באמצעות מנגנון העוגיות, וניתן יהיה לשנות את הבחירה בכל עת. פירוט הכלים הפעילים, מטרתם ומשך פעילותם יוצג במנגנון העוגיות או במדיניות עוגיות ייעודית.',
        ],
      },
      {
        title: '12. קטינים',
        paragraphs: [
          'האתר והשירותים מיועדים לארגונים ולאנשי מקצוע ואינם מכוונים לקטינים. אם נודע לנו שנאסף מידע אישי של קטין שלא לצורך ובלא הרשאה מתאימה, נפעל למחיקתו בהקדם הסביר.',
        ],
      },
      {
        title: '13. קישורים לאתרים אחרים',
        paragraphs: [
          'האתר עשוי לכלול קישורים לאתרים או שירותים של צדדים שלישיים. מדיניות זו אינה חלה על פעילותם, ואנו ממליצים לעיין במדיניות הפרטיות שלהם לפני מסירת מידע.',
        ],
      },
      {
        title: '14. שינויים במדיניות',
        paragraphs: [
          'אנו רשאים לעדכן מדיניות זו מעת לעת. מועד העדכון האחרון יופיע בראש העמוד. שינוי מהותי יוצג באופן בולט באתר, וככל שנדרש לפי דין, נבקש הסכמה מחודשת.',
        ],
      },
    ],
    contactHeading: 'יצירת קשר בענייני פרטיות',
    contactBody:
      'לפניות בנושא פרטיות, בקשות עיון, תיקון או מחיקה, ניתן לפנות אלינו באמצעות טופס יצירת הקשר באתר.',
  },
  en: {
    pageTitle: 'Privacy Policy',
    lastUpdated: 'Last updated: August 3, 2026',
    intro:
      'INNERSKY, a business owned by Adi Frahoudi Margolis ("INNERSKY", "we", "us"), respects the privacy of visitors to its website. This policy explains what personal information may be collected when you use the site and contact us, the purposes for which we use it, to whom it may be disclosed, how long it is retained and what your rights are. Use of the site and the contact form is subject to this policy and to applicable law, including the Israeli Protection of Privacy Law, 5741-1981, as amended, and the Protection of Privacy Regulations (Data Security), 5777-2017.',
    sections: [
      {
        title: '1. General',
        paragraphs: [
          'This policy applies to the use of the INNERSKY website and to any contact made through the contact form on the site.',
        ],
      },
      {
        title: '2. Data controller and how to reach us',
        paragraphs: [
          'The controller of information collected through the site is INNERSKY, owned by Adi Frahoudi Margolis. For any privacy-related question, or to exercise a right of access, correction or deletion, you may reach us via the contact form on the site or via the dedicated privacy email address shown next to the form and in the site footer.',
        ],
      },
      {
        title: '3. Information we collect',
        paragraphs: ['We may collect the following types of information:'],
        bullets: [
          'Information you submit through the form: full name, email address, phone number if provided, company name if provided, and the subject and content of your message.',
          'Information generated in the course of our relationship: correspondence, call notes, requests, proposals and the history of how your inquiry was handled.',
          'Basic technical information collected to operate and secure the site, such as IP address, browser type, access times, error data and security events, insofar as it is actually collected by our site infrastructure.',
          'Statistical or usage data, only if an analytics tool is enabled on the site and in accordance with your cookie choices.',
        ],
      },
      {
        title: '4. Is providing information mandatory',
        paragraphs: [
          'Providing the information in the contact form depends on your will and consent, and there is no legal obligation to provide it. Without the fields marked as required, we will not be able to identify your inquiry, respond to it or handle it in practice.',
          'We do not intend to collect sensitive information through the contact form. Please refrain from providing medical, financial, ID or passport details, payment details or other sensitive information that is not necessary for your inquiry.',
        ],
      },
      {
        title: '5. Purposes of use',
        bullets: [
          'Responding to your inquiry and contacting you as you have requested.',
          'Assessing suitability for INNERSKY services, preparing proposals and managing the ongoing business relationship.',
          'Documenting how the inquiry was handled, managing the service and improving our work processes.',
          'Operating the site, securing it, troubleshooting, preventing abuse and defending against cyber events.',
          'Complying with legal requirements, managing disputes and protecting legal rights.',
          'Sending marketing communications only if separate consent has been given as required, and subject to an easy opt-out.',
        ],
        paragraphs: [
          'We will not use the information for a purpose that is inconsistent with the purpose for which it was provided, unless we obtain appropriate consent or the use is permitted or required by law.',
        ],
      },
      {
        title: '6. Sharing information with third parties',
        paragraphs: ['We do not sell personal information. Information may be disclosed, only to the extent necessary, to the following categories:'],
        bullets: [
          'Hosting, cloud and website infrastructure providers.',
          'Email, form, security, backup and technical support providers.',
          'Professional advisors such as lawyers and accountants, where required.',
          'Competent authorities or other parties where disclosure is required by law, court order, legal proceedings or to protect rights.',
          'A party that acquires all or part of the business as part of a corporate change, subject to continued protection of the information.',
        ],
      },
      {
        title: '7. Transfers outside Israel',
        paragraphs: [
          'Some infrastructure and service providers may process or store information outside Israel. Where this occurs, we will act in accordance with applicable law and use appropriate arrangements intended to protect the information. Use of the site and submission of the form may involve such processing, depending on the providers that are actually active.',
        ],
      },
      {
        title: '8. Data retention',
        paragraphs: [
          'An inquiry that does not develop into a business relationship will generally be retained for up to 24 months from the date it was last handled, after which it will be deleted or anonymized, unless it needs to be retained for a different period under law or for a legitimate need such as managing a dispute or protecting rights. Information related to a business engagement will be retained for the duration of the engagement and afterward in accordance with legal requirements and legitimate business needs. Technical logs will be retained for the shortest periods possible in line with security and operational needs.',
        ],
      },
      {
        title: '9. Data security',
        paragraphs: [
          'We take reasonable and accepted organizational and technological measures to reduce the risk of unauthorized access, misuse, alteration, loss or disclosure of information. However, no system is fully secure, and we cannot guarantee complete immunity against every event.',
        ],
      },
      {
        title: '10. Your rights',
        paragraphs: [
          'Subject to law, an individual is entitled to request access to personal information held about them in a database. If the information is incorrect, incomplete, unclear or out of date, deletion or correction may be requested. You may also ask us to stop consent-based use, or to withdraw consent to marketing communications. Requests can be submitted via the contact details in section 2. To protect the requester\'s privacy, we may ask for reasonable details to verify identity. We will review every request and respond in accordance with the law.',
        ],
      },
      {
        title: '11. Cookies and analytics',
        paragraphs: [
          'The site may use essential cookies required for operation, security and preserving basic preferences. If non-essential analytics, advertising or tracking tools are enabled, they will not load before an appropriate choice has been made via the cookie mechanism, and the choice may be changed at any time. Details of active tools, their purposes and their retention periods will be shown in the cookie mechanism or in a dedicated cookie policy.',
        ],
      },
      {
        title: '12. Minors',
        paragraphs: [
          'The site and services are intended for organizations and professionals and are not directed at minors. If we become aware that personal information about a minor was collected without a proper need and without appropriate authorization, we will act to delete it within a reasonable time.',
        ],
      },
      {
        title: '13. Links to other sites',
        paragraphs: [
          'The site may include links to third-party sites or services. This policy does not apply to their activity, and we recommend reviewing their privacy policies before submitting information.',
        ],
      },
      {
        title: '14. Changes to this policy',
        paragraphs: [
          'We may update this policy from time to time. The date of the last update will appear at the top of the page. A material change will be presented prominently on the site, and where required by law, we will request renewed consent.',
        ],
      },
    ],
    contactHeading: 'Privacy contact',
    contactBody:
      'For privacy inquiries, access, correction or deletion requests, please contact us via the contact form on the site.',
  },
}
