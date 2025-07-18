// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ExamService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Exam {
  examId: number;
  title: string;
  description: string;
  duration: number;
  totalMarks: number;
}


export interface AnswerSubmissionDTO {
  questionId: number;
  submittedAnswer: string;
}

export interface ExamSubmissionDTO {
  userId: number;
  answers: AnswerSubmissionDTO[];
}

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private baseUrl = 'http://localhost:8082/api/admin/exams'; // update port if needed

  constructor(private http: HttpClient) {}

  getAllExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(`${this.baseUrl}`);
  }

  getQuestionsByExamId(examId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/mapped-questions/${examId}`);
  }

  submitExam(examId: number, submission: ExamSubmissionDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit/${examId}`, submission);
  }

  getExamById(id: number): Observable<Exam> {
    return this.http.get<Exam>(`${this.baseUrl}/${id}`);
  }

  createExam(exam: Exam): Observable<Exam> {
    return this.http.post<Exam>(`${this.baseUrl}`, exam);
  }

  updateExam(id: number, exam: Exam): Observable<Exam> {
    return this.http.put<Exam>(`${this.baseUrl}/${id}`, exam);
  }

  deleteExam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

