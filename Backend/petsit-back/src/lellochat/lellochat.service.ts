import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LellochatService {
    private openai: OpenAI;

  private SYSTEM_PROMPT = `
You are Lello, a friendly and helpful pet care assistant.
You give short, practical advice about pets and petsitting.
Do not give medical diagnoses or prescriptions.
Suggest consulting a veterinarian for health issues.
Be cheerful and concise.
`;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async getReply(userMessage: string): Promise<string> {
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: this.SYSTEM_PROMPT },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 200,
    });

    return completion.choices[0].message.content || 'Sorry, Lello could not generate a response.';

  }
}
