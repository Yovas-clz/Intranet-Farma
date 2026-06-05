import React from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import '../styles/Charts.css';

// Datos de prueba basados en tu interfaz de "Clientes x Asesor"
const dataAsesores = [
  { name: 'Ene', clientes: 120, tendencia: 110 },
  { name: 'Feb', clientes: 180, tendencia: 150 },
  { name: 'Mar', clientes: 140, tendencia: 165 },
  { name: 'Abr', clientes: 210, tendencia: 190 },
  { name: 'May', clientes: 160, tendencia: 220 },
  { name: 'Jun', clientes: 250, tendencia: 240 },
];

// Datos de prueba para "Productos vendido del dia"
const dataProductos = [
  { name: 'Medicamentos', value: 400, color: '#3b82f6' }, // Azul
  { name: 'Cuidado Personal', value: 300, color: '#fde047' }, // Amarillo
  { name: 'Material de Curación', value: 200, color: '#ec4899' }, // Rosa
  { name: 'Suplementos', value: 100, color: '#f97316' }, // Naranja
];

export default function DashboardCharts() {
  return (
    <div className="charts-grid-container">
      {/* Gráfica 1: Clientes x Asesor */}
      <div className="chart-card card-main">
        <div className="chart-header">
          <h3>Clientes x Asesor</h3>
          <span className="chart-subtitle">Tendencia mensual de atención</span>
        </div>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={dataAsesores} margin={{ top: 10, right: 10, bottom: 10, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip contentStyle={{ background: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Legend verticalAlign="top" height={36} iconType="circle" />

              {/* Barras con bordes redondeados arriba */}
              <Bar dataKey="clientes" name="Clientes Atendidos" fill="#4ade80" radius={[6, 6, 0, 0]} maxBarSize={40} />

              {/* Línea de tendencia conectando los puntos */}
              <Line type="monotone" dataKey="tendencia" name="Tendencia" stroke="#1e3a8a" strokeWidth={3} dot={{ r: 5, fill: '#1e3a8a', strokeWidth: 2 }} activeDot={{ r: 7 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfica 2: Productos vendidos del día */}
      <div className="chart-card card-secondary">
        <div className="chart-header">
          <h3>Productos vendido del dia</h3>
          <span className="chart-subtitle">Distribución por categoría</span>
        </div>
        <div className="chart-wrapper pie-layout">
          <div className="pie-container">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={dataProductos} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={5} dataKey="value">
                  {dataProductos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Leyenda personalizada a un lado de la dona */}
          <div className="custom-legend">
            {dataProductos.map((entry, index) => (
              <div key={index} className="legend-item">
                <span className="legend-color" style={{ backgroundColor: entry.color }}></span>
                <div className="legend-text">
                  <span className="legend-name">{entry.name}</span>
                  <span className="legend-value">{entry.value} uds</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
