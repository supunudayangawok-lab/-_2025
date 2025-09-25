import { GoogleGenAI, Type } from "@google/genai";
import { Horoscope, ZodiacSign, PersonalDetails, PersonalizedHoroscope } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateHoroscope(sign: ZodiacSign): Promise<Horoscope> {
  try {
    const prompt = `'${sign.name}' ලග්නය හිමි පුද්ගලයෙකු සඳහා දෛනික ලග්න පලාපලයක් සාදන්න. මෙම පලාපලය සුබවාදී සහ දිරිගන්වනසුළු විය යුතු අතර, දවස සඳහා මග පෙන්වීමක් ලබා දිය යුතුය. පොදු සාරාංශයක් සහ 'ආදරය', 'වෘත්තීය' සහ 'සෞඛ්‍යය' සඳහා වෙන වෙනම සවිස්තරාත්මක අනාවැකි සපයන්න.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: "ලග්නය සඳහා දවසේ දැක්ම පිළිබඳ පොදු සාරාංශයක්."
            },
            love: {
              type: Type.STRING,
              description: "දවස සඳහා ආදරය සහ සබඳතා පිළිබඳ අනාවැකිය."
            },
            career: {
              type: Type.STRING,
              description: "දවස සඳහා වෘත්තීය, රැකියාව සහ මූල්‍ය පිළිබඳ අනාවැකිය."
            },
            health: {
              type: Type.STRING,
              description: "දවස සඳහා සෞඛ්‍යය සහ යහපැවැත්ම පිළිබඳ අනාවැකිය."
            }
          },
          required: ["summary", "love", "career", "health"]
        },
      },
    });

    const jsonText = response.text.trim();
    const horoscopeData = JSON.parse(jsonText);
    
    return horoscopeData as Horoscope;

  } catch (error) {
    console.error("Error generating horoscope:", error);
    throw new Error("ග්‍රහ තරු සමඟ සම්බන්ධ වීමට නොහැකි විය. කරුණාකර මඳ වේලාවකින් නැවත උත්සාහ කරන්න.");
  }
}

export async function generatePersonalizedHoroscope(details: PersonalDetails): Promise<PersonalizedHoroscope> {
  try {
    const prompt = `ශ්‍රී ලාංකික ජ්‍යොතිෂ සම්ප්‍රදායට අනුව ප්‍රවීණ ජ්‍යෝතිඃ ශාස්ත්‍රඥයෙකු ලෙස ක්‍රියා කරන්න. පහත උපන් තොරතුරු මත පදනම්ව, '${details.name}' සඳහා සවිස්තරාත්මක, සත්‍ය ජන්ම පත්‍ර વિશ્ලේෂණයක් (කේන්දරයක්) සාදන්න. උපන් දිනය: ${details.dateOfBirth}, උපන් වේලාව: ${details.timeOfBirth}, උපන් ස්ථානය: ${details.placeOfBirth}. මෙම વિશ્ලේෂණය පහත සඳහන් කොටස් වලින් සමන්විත විය යුතුය: 1. ලග්නය: උපන් වේලාව සහ ස්ථානය අනුව නිවැරදිව ගණනය කරන ලද ලග්නය. 2. හැඳින්වීම: ලග්නය සහ එහි අධිපතියා පිළිබඳ කෙටි හැඳින්වීමක්. 3. පුද්ගල ලක්ෂණ: උපන් ග්‍රහ පිහිටීම් අනුව සවිස්තරාත්මක චරිත ලක්ෂණ. 4. ජීවන ගමන් මග: අධ්‍යාපනය, වෘත්තීය ජීවිතය සහ ධනය පිළිබඳ විශ්ලේෂණයක්. 5. ග්‍රහ බලපෑම්: ජන්ම පත්‍රයේ ඇති ප්‍රධාන ග්‍රහ යෝග සහ ඒවායේ බලපෑම්. 6. උපදෙස්: ජීවිතය සාර්ථක කර ගැනීමට සහ අපල මගහරවා ගැනීමට ලබා දිය හැකි පුද්ගලික උපදෙස්. පිළිතුර සිංහල භාෂාවෙන්, ගැඹුරු සහ සම්ප්‍රදායික ජ්‍යොතිෂ පාරිභාෂිත වචන භාවිතා කරමින්, ගෞරවාන්විතව ඉදිරිපත් කරන්න.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            lagnaya: {
              type: Type.STRING,
              description: "උපන් වේලාව සහ ස්ථානය අනුව ගණනය කරන ලද ලග්නය."
            },
            introduction: {
              type: Type.STRING,
              description: "ලග්නය සහ එහි අධිපතියා පිළිබඳ කෙටි හැඳින්වීමක්."
            },
            personalityTraits: {
              type: Type.STRING,
              description: "උපන් ග්‍රහ පිහිටීම් අනුව සවිස්තරාත්මක චරිත ලක්ෂණ."
            },
            lifePath: {
              type: Type.STRING,
              description: "අධ්‍යාපනය, වෘත්තීය ජීවිතය සහ ධනය පිළිබඳ විශ්ලේෂණයක්."
            },
            planetaryInfluences: {
              type: Type.STRING,
              description: "ජන්ම පත්‍රයේ ඇති ප්‍රධාන ග්‍රහ යෝග සහ ඒවායේ බලපෑම්."
            },
            advice: {
              type: Type.STRING,
              description: "ජීවිතය සාර්ථක කර ගැනීමට සහ අපල මගහරවා ගැනීමට ලබා දිය හැකි පුද්ගලික උපදෙස්."
            }
          },
          required: ["lagnaya", "introduction", "personalityTraits", "lifePath", "planetaryInfluences", "advice"]
        },
      },
    });

    const jsonText = response.text.trim();
    const horoscopeData = JSON.parse(jsonText);
    
    return horoscopeData as PersonalizedHoroscope;

  } catch (error) {
    console.error("Error generating personalized horoscope:", error);
    throw new Error("ඔබේ කේන්දරය සෑදීමට නොහැකි විය. කරුණාකර ඇතුලත් කල තොරතුරු සහ අන්තර්ජාල සම්බන්ධතාවය පරීක්ෂා කර නැවත උත්සාහ කරන්න.");
  }
}