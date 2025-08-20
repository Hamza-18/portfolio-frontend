import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Project } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    // In a real application, this would fetch from an API
    // For now, we'll return mock data
    return of([
      {
        id: 1,
        title: 'Backend API Framework',
        description: 'A robust RESTful API framework built with Node.js, Express, and MongoDB. Features JWT authentication, role-based access control, and comprehensive API documentation with Swagger.',
        thumbnail: 'assets/images/projects/backend-api.png',
        technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger'],
        githubUrl: 'https://github.com/yourusername/backend-api-framework',
        demoUrl: 'https://api-demo.yourdomain.com',
        featured: true,
        category: 'Backend'
      },
      {
        id: 2,
        title: 'Microservices Architecture',
        description: 'A scalable microservices system using Docker and Kubernetes. Implements service discovery, load balancing, and circuit breaking patterns for high availability.',
        thumbnail: 'assets/images/projects/microservices.png',
        technologies: ['Docker', 'Kubernetes', 'Node.js', 'Redis', 'RabbitMQ'],
        githubUrl: 'https://github.com/yourusername/microservices-architecture',
        featured: true,
        category: 'DevOps'
      },
      {
        id: 3,
        title: 'Real-time Data Pipeline',
        description: 'A high-performance data pipeline for processing streaming data. Built with Apache Kafka, Spark, and Elasticsearch for real-time analytics and monitoring.',
        thumbnail: 'assets/images/projects/data-pipeline.png',
        technologies: ['Apache Kafka', 'Spark', 'Elasticsearch', 'Python', 'AWS'],
        githubUrl: 'https://github.com/yourusername/realtime-data-pipeline',
        demoUrl: 'https://data-demo.yourdomain.com',
        featured: false,
        category: 'Data Engineering'
      },
      {
        id: 4,
        title: 'Secure Authentication Service',
        description: 'A standalone authentication service with multi-factor authentication, OAuth integration, and advanced security features.',
        thumbnail: 'assets/images/projects/auth-service.png',
        technologies: ['Node.js', 'TypeScript', 'Redis', 'OAuth', '2FA'],
        githubUrl: 'https://github.com/yourusername/secure-auth-service',
        featured: false,
        category: 'Security'
      },
      {
        id: 5,
        title: 'DevOps Automation Suite',
        description: 'A collection of scripts and tools for automating CI/CD pipelines, infrastructure provisioning, and monitoring.',
        thumbnail: 'assets/images/projects/devops-automation.png',
        technologies: ['Terraform', 'Ansible', 'Jenkins', 'Prometheus', 'Grafana'],
        githubUrl: 'https://github.com/yourusername/devops-automation',
        featured: true,
        category: 'DevOps'
      },
      {
        id: 6,
        title: 'Distributed Cache System',
        description: 'A custom distributed caching solution with sharding, replication, and fault tolerance built on top of Redis.',
        thumbnail: 'assets/images/projects/distributed-cache.png',
        technologies: ['Redis', 'Go', 'Protocol Buffers', 'Consistent Hashing'],
        githubUrl: 'https://github.com/yourusername/distributed-cache',
        featured: false,
        category: 'Backend'
      }
    ]);
  }
}
