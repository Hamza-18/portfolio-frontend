import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { ChatbotComponent } from './chatbot.component';
import { ChatbotService } from '../services/chatbot.service';
import { Nl2brPipe } from '../pipes/nl2br.pipe';

describe('ChatbotComponent', () => {
  let component: ChatbotComponent;
  let fixture: ComponentFixture<ChatbotComponent>;
  let chatbotService: jasmine.SpyObj<ChatbotService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ChatbotService', ['sendMessage']);

    await TestBed.configureTestingModule({
      declarations: [ChatbotComponent, Nl2brPipe],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        { provide: ChatbotService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatbotComponent);
    component = fixture.componentInstance;
    chatbotService = TestBed.inject(ChatbotService) as jasmine.SpyObj<ChatbotService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with welcome message', () => {
    expect(component.messages.length).toBe(1);
    expect(component.messages[0].isUser).toBeFalse();
    expect(component.messages[0].text).toContain('Hi!');
  });

  it('should toggle chat window', () => {
    expect(component.isChatOpen).toBeFalse();
    component.toggleChat();
    expect(component.isChatOpen).toBeTrue();
    component.toggleChat();
    expect(component.isChatOpen).toBeFalse();
  });

  it('should send message successfully', () => {
    const mockResponse = {
      response: 'Test response',
      confidence: 0.9,
      session_id: 'test-session'
    };
    chatbotService.sendMessage.and.returnValue(of(mockResponse));

    component.currentMessage = 'Test message';
    component.sendMessage();

    expect(component.messages.length).toBe(3); // Welcome + user + bot
    expect(component.messages[1].text).toBe('Test message');
    expect(component.messages[1].isUser).toBeTrue();
    expect(component.messages[2].text).toBe('Test response');
    expect(component.messages[2].isUser).toBeFalse();
    expect(component.currentMessage).toBe('');
  });

  it('should handle error when sending message', () => {
    chatbotService.sendMessage.and.returnValue(throwError('Network error'));

    component.currentMessage = 'Test message';
    component.sendMessage();

    expect(component.messages.length).toBe(3); // Welcome + user + error
    expect(component.messages[2].text).toContain('Sorry, I encountered an error');
    expect(component.isLoading).toBeFalse();
  });

  it('should not send empty message', () => {
    const initialMessageCount = component.messages.length;
    component.currentMessage = '   ';
    component.sendMessage();

    expect(component.messages.length).toBe(initialMessageCount);
    expect(chatbotService.sendMessage).not.toHaveBeenCalled();
  });

  it('should clear chat and reset session', () => {
    component.currentMessage = 'Test';
    component.sendMessage();
    const initialSessionId = component.sessionId;

    component.clearChat();

    expect(component.messages.length).toBe(1); // Only welcome message
    expect(component.sessionId).not.toBe(initialSessionId);
  });

  it('should handle Enter key press', () => {
    spyOn(component, 'sendMessage');
    const event = new KeyboardEvent('keypress', { key: 'Enter' });
    
    component.currentMessage = 'Test message';
    component.onKeyPress(event);

    expect(component.sendMessage).toHaveBeenCalled();
  });

  it('should not send on Shift+Enter', () => {
    spyOn(component, 'sendMessage');
    const event = new KeyboardEvent('keypress', { key: 'Enter', shiftKey: true });
    
    component.onKeyPress(event);

    expect(component.sendMessage).not.toHaveBeenCalled();
  });
});
