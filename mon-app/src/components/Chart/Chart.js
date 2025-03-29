import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "./Chart.css"

const COLORS = {
    "Nouveau": "#C70039",
    "En attente": "#FFC107",
    "Reussi": "#28a745"
};


const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                color: "white",
                padding: "5px 10px",
                borderRadius: "5px",
                fontSize: "10px",
                textAlign: "center",
            }}>
                <p style={{ margin: 0 }}>{`${payload[0].name} : ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
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
            <Tooltip content={<CustomTooltip />} />
        </PieChart>
    );
};

export default Chart;
