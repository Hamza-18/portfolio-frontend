import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatRequest {
  message: string;
  session_id?: string;
}

export interface ChatResponse {
  response: string;
  confidence: number;
  session_id: string;
}

export interface ChatError {
  error: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private readonly apiUrl = 'http://localhost:5000'; // Backend API URL
  private readonly chatEndpoint = '/api/chatbot/chat';

  constructor(private http: HttpClient) {}

  sendMessage(message: string, sessionId: string): Observable<ChatResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const requestBody: ChatRequest = {
      message: message.trim(),
      session_id: sessionId
    };

    return this.http.post<ChatResponse>(
      `${this.apiUrl}${this.chatEndpoint}`,
      requestBody,
      { headers }
    );
  }
}
