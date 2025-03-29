import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./Chart.css"

const COLORS = {
    "Nouveau": "#C70039",
    "En attente": "#FFC107",
    "Reussi": "#28a745"
};

const Chart = ({ taches = [] }) => {
    const repartitionEtats = taches.reduce((acc, tache) => {
        acc[tache.etat] = (acc[tache.etat] || 0) + 1;
        return acc;
    }, {});

    const data = Object.keys(repartitionEtats).map(etat => ({
        name: etat,
        value: repartitionEtats[etat]
    }));

    return (
        <PieChart width={180} height={180}>
            <Pie data={data} cx="50%" cy="50%" outerRadius={60} fill="#8884d8" dataKey="value">
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name] || "#ccc"} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    );
};

export default Chart;
