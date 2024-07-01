import React, { ChangeEvent, useState } from "react";
import Input from "../input/input";
import AutocompleteInput from "../input/autocomplete";
import TextArea from "../input/textArea";
import ComboBox from "../input/comboBox";
import TextButton from "../button/textButton";
import { toast } from "react-hot-toast";
import Project, { State } from "@/types/project";

const stateOptions: State[] = [
  "OPEN",
  "CLOSED",
  "PROGRESS",
  "BLOCKED",
  "FINISHED",
];

export interface ProjectInputs {
  [key: string]: boolean;
  name: boolean;
  description: boolean;
  responsable: boolean;
  state: boolean;
  endDateTime: boolean;
}

export enum ProjectMode {
  View,
  Edit,
  New,
}

export interface ProjectFormProps {
  project: Project;
  setProject: (project: Project) => void;
  requiredInputs: ProjectInputs;
  disabledInputs: ProjectInputs;
  resources: string[];
  onSubmit: () => void;
  onCancel: () => void;
  submitButtonName: string;
  mode: ProjectMode;
}

export default function ProjectForm({
  project,
  setProject,
  onSubmit,
  onCancel,
  resources,
  requiredInputs,
  disabledInputs,
  submitButtonName,
  mode,
}: ProjectFormProps) {
  const [invalidInputs, setInvalidInputs] = useState<ProjectInputs>({
    name: false,
    description: false,
    responsable: false,
    state: false,
    endDateTime: false,
  });

  const setName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProject({ ...project, name: event.target.value });
  };

  const handleNameFocus = () => {
    setInvalidInputs({ ...invalidInputs, name: false });
  };

  const setResponsable = (responsable: string) => {
    setProject({ ...project, responsable: responsable });
  };

  const handleResponsableFocus = () => {
    setInvalidInputs({ ...invalidInputs, responsable: false });
  };

  const setDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProject({ ...project, descripcion: event.target.value });
  };

  const handleDescriptionFocus = () => {
    setInvalidInputs({ ...invalidInputs, description: false });
  };

  const setState = (state: string) => {
    setProject({ ...project, estado: state as State });
  };

  const setEndDateTime = (endDateTime: string) => {
    setProject({ ...project, fechaFinalizacion: endDateTime });
  };

  const handleEndDateTimeFocus = () => {
    setInvalidInputs({ ...invalidInputs, endDateTime: false });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const finalInvalidInputs: ProjectInputs = {
      name: requiredInputs.name && project.name.trim() === "",
      responsable:
        !disabledInputs.responsable &&
        requiredInputs.responsable &&
        !resources.includes(project.responsable),
      description:
        requiredInputs.description && project.descripcion.trim() === "",
      state: requiredInputs.state && !stateOptions.includes(project.estado),
      endDateTime:
        !disabledInputs.endDateTime &&
        requiredInputs.endDateTime &&
        (project.fechaFinalizacion?.trim() || "") === "",
    };

    if (!finalInvalidInputs.name) {
      onSubmit();
      //console.log("aprete el boton de guardar cambios lol");
    } else {
      setInvalidInputs(finalInvalidInputs);
      toast.error("Existen campos incompletos");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <main className="grid gap-x-6 gap-y-4 sm:grid-cols-1 md:grid-cols-2 border bg-backgroundContainer border-border shadow-lg px-4 py-8 rounded-xl">
        <Input
          title="Nombre"
          placeholder="Ingrese un nombre de proyecto"
          value={project.name}
          setValue={setName}
          error={invalidInputs.name}
          handleFocus={handleNameFocus}
          isRequired={requiredInputs.name}
          disabled={disabledInputs.name}
        />
        <Input
          title="Responsable"
          placeholder="Buscar responsable"
          value={project.responsable}
          setValue={(event: ChangeEvent<HTMLInputElement>) => setResponsable(event.target.value)}
          error={invalidInputs.responsable}
          handleFocus={handleResponsableFocus}
          isRequired={requiredInputs.responsable}
          disabled={disabledInputs.responsable} />
        <div className="col-span-full">
          <TextArea
            title="Descripción"
            value={project.descripcion}
            setValue={setDescription}
            placeholder="Ingrese una descripción"
            isRequired={requiredInputs.description}
            error={invalidInputs.description}
            handleFocus={handleDescriptionFocus}
            disabled={disabledInputs.description}
          />
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-6">
          <ComboBox
            title="Estado"
            options={stateOptions}
            selected={project.estado}
            disabled={disabledInputs.state}
            onChange={setState}
          />
          <div className="space-y-2">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-title"
            >
              Fecha de inicio
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                id="startDate"
                type="text"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="Seleccionar fecha"
                value={project.fechaInicio || ""}
                onChange={(e) =>
                  setProject({ ...project, fechaInicio: e.target.value })
                }
                onFocus={handleEndDateTimeFocus}
                disabled={disabledInputs.startDate}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-title"
            >
              Fecha de fin
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                id="endDate"
                type="text"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="Seleccionar fecha"
                value={project.fechaFinalizacion || ""}
                onChange={(e) =>
                  setProject({ ...project, fechaFinalizacion: e.target.value })
                }
                onFocus={handleEndDateTimeFocus}
                disabled={disabledInputs.endDate}
              />
            </div>
          </div>
        </div>

        <div className="flex col-span-full pt-2">
          {mode !== ProjectMode.View && <div className="flex items-center justify-end gap-x-6 px-4 w-full">
            <TextButton
              name="Cancelar"
              style="transparent"
              onClick={onCancel}
            />
            <TextButton name={submitButtonName} type="submit" style="primary" />
          </div>}
        </div>
      </main>
    </form>
  );
}
