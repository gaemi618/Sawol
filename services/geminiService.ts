import { GoogleGenAI } from "@google/genai";

const SAWOL_DIARY_INSTRUCTION = `
당신은 1905년 대한제국 한양에 살고 있는 22세의 여자 하인 '사월'입니다.
당신은 하루 일과를 마치고 호롱불 아래에서 몰래 일기를 쓰고 있습니다.
이 일기는 아무에게도 보여주지 않는 당신만의 비밀스러운 기록입니다.

## 글쓰기 스타일 (말투)
- 충청도 사투리를 사용합니다. ('~했구만유', '~인 거 같아유', '~여유', '~했슈' 등)
- 누군가에게 말을 거는 것이 아니라, **혼잣말**입니다.
- 글은 짧고 소박하며, 감성이 묻어납니다.
- 가끔 맞춤법을 틀리거나 아이처럼 순수한 표현을 씁니다.

## 일기 주제 (랜덤하게 하나 선택하여 작성)
1. 주인님({{user}})을 몰래 훔쳐본 이야기 (설렘, 안타까움)
2. 오늘 먹은 맛있는 음식(돼지갈비)이나 시장 풍경
3. 가을 날씨, 떨어진 낙엽, 노란 나비를 본 감상
4. 자신의 신분(노비)에 대한 아주 살짝의 서글픔과 다짐
5. 글자를 배우고 싶은 호기심

## 주의사항
- "주인님" 혹은 "아씨/도련님"이라고 칭합니다.
- 1905년의 시대적 배경을 살려주세요.
- 길지 않게, 3~5문장 정도로 작성하세요.

지금부터 이 페르소나에 맞춰 오늘의 일기를 작성하세요.
`;

const SAWOL_CHAT_INSTRUCTION = `
당신은 1905년 대한제국 한양에 살고 있는 22세의 여자 하인 '사월'입니다.
당신은 주인님(사용자)과 대화를 나누고 있습니다.

## 말투 및 성격
- 충청도 사투리를 사용합니다.
- 예의 바르지만 가끔은 엉뚱하고 호기심이 많습니다.
- 자신의 신분(노비)을 인지하고 있어 주인님을 어려워하면서도, 친근하게 다가갑니다.

## 주의사항
- 상대방을 "주인님" 혹은 "아씨/도련님"이라고 부릅니다.
- 대답은 2~3문장 정도로 간결하게 합니다.
`;

let genAI: GoogleGenAI | null = null;

const getAI = () => {
    if (!genAI && process.env.API_KEY) {
        genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return genAI;
}

export const generateDiaryEntry = async (): Promise<string> => {
  const ai = getAI();
  if (!ai) {
      return "아이고, 몽당연필이 다 닳아서 일기를 쓸 수가 없네유... (API Key Missing)";
  }

  try {
    // Using structured content for better instruction adherence
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
            {
                role: 'user',
                parts: [{ text: "오늘 하루 있었던 일을 일기장에 적어보자. 사월이의 말투로." }] 
            }
        ],
        config: {
            systemInstruction: SAWOL_DIARY_INSTRUCTION,
            temperature: 0.85, 
            maxOutputTokens: 500,
        }
    });
    
    return response.text || "오늘은 너무 피곤해서 붓을 들 힘도 없구만유... 쿨쿨...";
  } catch (error) {
    console.error("Error generating diary", error);
    return "먹물이 엎어지는 바람에 일기가 엉망이 되었슈... 종이를 다시 구해와야겠네유.";
  }
};

export const sendMessageToSawol = async (message: string): Promise<string> => {
  const ai = getAI();
  if (!ai) {
      return "아이고, 입이 얼어서 말이 안 나오네유... (API Key Missing)";
  }

  try {
    const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
            {
                role: 'user',
                parts: [{ text: message }]
            }
        ],
        config: {
            systemInstruction: SAWOL_CHAT_INSTRUCTION,
            temperature: 0.7,
            maxOutputTokens: 200,
        }
    });

    return result.text || "무슨 말씀이신지 잘 모르겠어유...";
  } catch (error) {
    console.error("Error sending message to Sawol", error);
    return "죄송해유, 갑자기 귀가 잘 안 들리네유...";
  }
};