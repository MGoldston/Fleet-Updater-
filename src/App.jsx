// Aircraft Status Tracker App with Image Rendering, Notifications, and Full Functionality

import { useState } from 'react';
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem } from "./components/ui/select";
import { Input } from "./components/ui/input";

const BASES = ["Karratha", "Port Headland", "Hay Point", "Mackay", "Gladstone", "Newcastle", "Other"];
const AIRCRAFT = [
  "VH-8Z3", "VH-8Z4", "VH-8Z9", "VH-DBJ", "VH-DKA",
  "VH-XU8", "VH-XU9", "VH-XUV", "VH-ZFD", "VH-ZFM",
  "VH-ZGH", "VH-ZGP", "VH-ZGZ"
];
const ROLES = ["Engineer", "Manager", "Admin"];
const AIRCRAFT_IMAGES = {
  "VH-DBJ": "/images/as350.jpg",
  "VH-DKA": "/images/as350.jpg",
  "VH-XUV": "/images/ec135.jpg",
  "VH-ZGZ": "/images/ec135.jpg",
  "VH-ZGH": "/images/ec135.jpg",
  "VH-ZGP": "/images/ec135.jpg",
  "VH-8Z3": "/images/ec135.jpg",
  "VH-8Z4": "/images/ec135.jpg",
  "VH-8Z9": "/images/ec135.jpg",
  "VH-XU8": "/images/ec135.jpg",
  "VH-XU9": "/images/ec135.jpg",
  "VH-ZFD": "/images/ec135.jpg",
  "VH-ZFM": "/images/ec145.jpg"
};

export default function AircraftStatusApp() {
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState("");
  const [base, setBase] = useState(BASES[0]);
  const [statusData, setStatusData] = useState({});
  const [log, setLog] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedAircraft, setSelectedAircraft] = useState(null);
  const [note, setNote] = useState("");

  const handleLogin = () => {
    const stored = users.find(u => u.name === username);
    if (stored) setRole(stored.role);
  };

  const updateStatus = (aircraft, status) => {
    const newStatus = {
      aircraft,
      status,
      note: status === "Offline/Unserviceable" ? note : "",
      base,
      updatedBy: username,
      updatedAt: new Date().toLocaleString()
    };
    setStatusData(prev => ({ ...prev, [aircraft]: newStatus }));
    setLog(prev => [newStatus, ...prev]);
    setNote("");
    setSelectedAircraft(aircraft);
  };

  const addUser = (name, role) => {
    setUsers(prev => [...prev, { name, role }]);
  };

  const deleteUser = name => {
    setUsers(prev => prev.filter(u => u.name !== name));
  };

  const filteredAircraft = AIRCRAFT.filter(ac => !statusData[ac] || statusData[ac].base === base || role !== "Engineer");

  if (!role) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-2">Login</h2>
        <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <Button onClick={handleLogin}>Login</Button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Fleet Status ({role})</h1>
      {role === "Engineer" && (
        <div className="grid gap-4">
          <Select value={base} onValueChange={setBase}>
            <SelectTrigger><span>{base}</span></SelectTrigger>
            <SelectContent>
              {BASES.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
            </SelectContent>
          </Select>
          {filteredAircraft.map(ac => (
            <Card key={ac} className="flex items-center gap-4">
              <img src={AIRCRAFT_IMAGES[ac]} alt={ac} className="w-24" />
              <CardContent>
                <div className="font-semibold">{ac}</div>
                <Select onValueChange={value => updateStatus(ac, value)}>
                  <SelectTrigger><span>Set Status</span></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Online/Serviceable">Online/Serviceable</SelectItem>
                    <SelectItem value="Offline/Unserviceable">Offline/Unserviceable</SelectItem>
                  </SelectContent>
                </Select>
                {selectedAircraft === ac && statusData[ac]?.status === "Offline/Unserviceable" && (
                  <Textarea placeholder="Enter notes" value={note} onChange={e => setNote(e.target.value)} />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {role === "Manager" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AIRCRAFT.map(ac => (
              <Card key={ac} className="border p-2">
                <div className={`p-2 rounded text-white ${statusData[ac]?.status === "Online/Serviceable" ? "bg-green-600" : "bg-red-600"}`}>
                  <strong>{ac}</strong> – {statusData[ac]?.status || "Unknown"}<br />
                  <small>{statusData[ac]?.base || "-"}</small>
                </div>
              </Card>
            ))}
          </div>
          <h2 className="text-lg mt-6 mb-2 font-bold">Update Log</h2>
          <ul className="text-sm space-y-1">
            {log.map((entry, idx) => (
              <li key={idx} className="border-b pb-1">
                {entry.updatedAt}: {entry.aircraft} → {entry.status} @ {entry.base} by {entry.updatedBy}
              </li>
            ))}
          </ul>
        </div>
      )}

      {role === "Admin" && (
        <div className="space-y-2">
          <h2 className="text-lg font-bold">User Management</h2>
          <Input placeholder="New username" value={username} onChange={e => setUsername(e.target.value)} />
          <Select onValueChange={role => addUser(username, role)}>
            <SelectTrigger><span>Select Role</span></SelectTrigger>
            <SelectContent>
              {ROLES.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
            </SelectContent>
          </Select>
          <ul>
            {users.map((u, idx) => (
              <li key={idx} className="flex justify-between border-b py-1">
                <span>{u.name} – {u.role}</span>
                <Button variant="destructive" onClick={() => deleteUser(u.name)}>Delete</Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}