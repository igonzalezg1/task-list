import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskEntity, TaskInterface } from '../interfaces/TaskInterface';
import { TaskStatus } from '../types/TaskTypes';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  private readonly STORAGE_KEY = 'taskflow:tasks';
  private readonly _tasks$ = new BehaviorSubject<TaskEntity[]>(
    this.readFromStorage()
  );
  readonly tasks$ = this._tasks$.asObservable();

  list(): TaskEntity[] {
    return this._tasks$.value;
  }

  create(draft: TaskInterface): TaskEntity {
    const entity: TaskEntity = {
      id: this.uuid(),
      nombre: draft.nombre,
      descripcion: draft.descripcion,
      prioridad: draft.prioridad,
      fechaLimite: draft.fechaLimite ? new Date(draft.fechaLimite) : null,
      fechaCreacion: draft.fechaCreacion
        ? new Date(draft.fechaCreacion)
        : new Date(),
      status: draft.status ?? 'creada',
    };
    const next = [...this._tasks$.value, entity];
    this.persist(next);
    return entity;
  }

  getById(id: string): TaskEntity | undefined {
    return this._tasks$.value.find((t) => t.id === id);
  }

  update(
    id: string,
    changes: Partial<Omit<TaskEntity, 'id' | 'fechaCreacion'>>
  ): TaskEntity | undefined {
    let updated: TaskEntity | undefined;
    const next = this._tasks$.value.map((t) => {
      if (t.id !== id) return t;
      updated = {
        ...t,
        ...changes,
        fechaLimite:
          changes.fechaLimite !== undefined
            ? changes.fechaLimite
              ? new Date(changes.fechaLimite as any)
              : null
            : t.fechaLimite,
      };
      return updated!;
    });
    this.persist(next);
    return updated;
  }

  remove(id: string): void {
    const next = this._tasks$.value.filter((t) => t.id !== id);
    this.persist(next);
  }

  setStatus(id: string, status: TaskStatus): TaskEntity | undefined {
    return this.update(id, { status });
  }

  private persist(tasks: TaskEntity[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    this._tasks$.next(tasks);
  }

  private readFromStorage(): TaskEntity[] {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as any[];
      return parsed.map((t) => ({
        ...t,
        fechaCreacion: t.fechaCreacion ? new Date(t.fechaCreacion) : new Date(),
        fechaLimite: t.fechaLimite ? new Date(t.fechaLimite) : null,
      })) as TaskEntity[];
    } catch {
      return [];
    }
  }

  private uuid(): string {
    try {
      return crypto.randomUUID();
    } catch {
      return (
        't_' + Math.random().toString(36).slice(2) + Date.now().toString(36)
      );
    }
  }

  clearAll(): void {
    this.persist([]);
  }
}
