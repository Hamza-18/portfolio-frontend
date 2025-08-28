import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ChatbotService, ChatResponse } from '../services/chatbot.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
  confidence?: number;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  
  messages: ChatMessage[] = [];
  currentMessage: string = '';
  isLoading: boolean = false;
  isChatOpen: boolean = false;
  sessionId: string = '';
  
  private destroy$ = new Subject<void>();
  private shouldScrollToBottom = false;

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit(): void {
    this.sessionId = this.generateSessionId();
    this.addWelcomeMessage();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage(): void {
    if (!this.currentMessage.trim() || this.isLoading) {
      return;
    }

    const userMessage = this.currentMessage.trim();
    this.addMessage(userMessage, true);
    this.currentMessage = '';
    this.isLoading = true;

    this.chatbotService.sendMessage(userMessage, this.sessionId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: ChatResponse) => {
          this.addMessage(response.response, false, response.confidence);
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Chat error:', error);
          this.addMessage('Sorry, I encountered an error. Please try again.', false);
          this.isLoading = false;
        }
      });
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  clearChat(): void {
    this.messages = [];
    this.sessionId = this.generateSessionId();
    this.addWelcomeMessage();
  }

  private addMessage(text: string, isUser: boolean, confidence?: number): void {
    const message: ChatMessage = {
      text,
      isUser,
      timestamp: new Date(),
      confidence
    };
    this.messages.push(message);
    this.shouldScrollToBottom = true;
  }

  private addWelcomeMessage(): void {
    this.addMessage('Hi! I\'m your portfolio assistant. Feel free to ask me about my experience, projects, or skills!', false);
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Could not scroll to bottom:', err);
    }
  }

  private generateSessionId(): string {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }
}
