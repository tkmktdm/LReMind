"use client";

import React, { ElementRef, ReactNode } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

interface BaseContentProps {
  children: React.ReactNode;
}

export const BaseContent = ({ children }: BaseContentProps) => {
  return (
    <BaseContent>
      <div className="flex flex-col w-1/5 h-4/5">{children}</div>

      {/* Calendar */}
      <div className="flex flex-col w-4/5 h-full space-y-4 flex-1 overflow-hidden">
        <div className="w-full h-full overflow-auto flex items-center justify-center">
          <FullCalendar
            locale={"ja"}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            height="auto"
            contentHeight="auto"
          />
        </div>
      </div>
    </BaseContent>
  );
};
