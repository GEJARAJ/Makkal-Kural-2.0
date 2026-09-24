'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export function ComplaintMap({
  latitude,
  longitude,
  locality,
  district,
  state = 'India',
  height = 400,
}: {
  latitude?: number;
  longitude?: number;
  locality?: string;
  district?: string;
  state?: string;
  height?: number;
}) {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // 1. If explicit coordinates provided
    if (
      latitude !== undefined &&
      longitude !== undefined &&
      !isNaN(Number(latitude)) &&
      !isNaN(Number(longitude)) &&
      Number(latitude) !== 0 &&
      Number(longitude) !== 0
    ) {
      setPosition([Number(latitude), Number(longitude)]);
      setLoading(false);
      return;
    }

    // Default National Center: New Delhi (28.6139, 77.2090)
    const fallbackPos: [number, number] = [28.6139, 77.2090];

    if (!locality && !district && !state) {
      setPosition(fallbackPos);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    const query = [locality, district, state, 'India'].filter(Boolean).join(', ');

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`, {
      headers: { 'Accept': 'application/json' },
    })
      .then(res => res.json())
      .then((data: any[]) => {
        if (cancelled) return;
        if (data && data[0]?.lat && data[0]?.lon) {
          setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        } else {
          setPosition(fallbackPos);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setPosition(fallbackPos);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [latitude, longitude, locality, district, state]);

  if (!mounted || loading || !position) {
    return (
      <div
        className="rounded-xl border border-navy-200 dark:border-navy-800 bg-navy-50/70 dark:bg-navy-900/70 flex flex-col items-center justify-center text-xs text-navy-500 gap-2"
        style={{ height }}
      >
        <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
        <span>Loading map location...</span>
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden border border-navy-200 dark:border-navy-800 shadow-sm relative" style={{ height }}>
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            <div className="text-xs font-semibold text-navy-900 p-0.5">
              <div className="font-bold text-navy-950 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 inline" />
                <span>{locality || 'Grievance Site'}</span>
              </div>
              {(district || state) && (
                <span className="block text-navy-500 font-normal mt-0.5">
                  {[district, state].filter(Boolean).join(', ')}, India
                </span>
              )}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
