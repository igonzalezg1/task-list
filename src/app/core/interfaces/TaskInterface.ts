import { TaskStatus } from "../types/TaskTypes";

export interface TaskInterface {
  nombre: string;
  descripcion: string;
  prioridad: 'alta' | 'mediana' | 'baja';
  fechaLimite: Date | null;
  fechaCreacion?: Date;
  status?: 'creada' | 'en progreso' | 'completada';
}

export interface TaskEntity extends TaskInterface {
  id: string;
  fechaCreacion: Date;
  status: TaskStatus;
}
