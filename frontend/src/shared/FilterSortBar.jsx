import React, { useEffect, useState } from "react";

const categories = ["Adventure","Family","Honeymoon","Cultural","Wildlife","Beach"];

export default function FilterSortBar({ onChange, initial = {} }) {
  const [filters, setFilters] = useState({
    priceMin: initial.priceMin || "",
    priceMax: initial.priceMax || "",
    ratingMin: initial.ratingMin || "",
    durationMin: initial.durationMin || "",
    durationMax: initial.durationMax || "",
    category: initial.category || "",
    sort: initial.sort || "",
  });

  useEffect(() => { onChange && onChange(filters); }, [filters]);

  return (
    <div className="d-flex gap-2 align-items-end flex-wrap mb-3">
      <div>
        <label className="d-block small">Min Price</label>
        <input className="form-control" type="number" value={filters.priceMin}
          onChange={e=>setFilters(f=>({...f, priceMin:e.target.value}))} placeholder="0" />
      </div>
      <div>
        <label className="d-block small">Max Price</label>
        <input className="form-control" type="number" value={filters.priceMax}
          onChange={e=>setFilters(f=>({...f, priceMax:e.target.value}))} placeholder="5000" />
      </div>
      <div>
        <label className="d-block small">Min Rating</label>
        <input className="form-control" type="number" min="0" max="5" step="0.1" value={filters.ratingMin}
          onChange={e=>setFilters(f=>({...f, ratingMin:e.target.value}))} placeholder="4.0" />
      </div>
      <div>
        <label className="d-block small">Duration Min</label>
        <input className="form-control" type="number" value={filters.durationMin}
          onChange={e=>setFilters(f=>({...f, durationMin:e.target.value}))} placeholder="1" />
      </div>
      <div>
        <label className="d-block small">Duration Max</label>
        <input className="form-control" type="number" value={filters.durationMax}
          onChange={e=>setFilters(f=>({...f, durationMax:e.target.value}))} placeholder="10" />
      </div>
      <div>
        <label className="d-block small">Category</label>
        <select className="form-select" value={filters.category} onChange={e=>setFilters(f=>({...f, category:e.target.value}))}>
          <option value="">Any</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="d-block small">Sort</label>
        <select className="form-select" value={filters.sort} onChange={e=>setFilters(f=>({...f, sort:e.target.value}))}>
          <option value="">Default</option>
          <option value="popular">Most Popular</option>
          <option value="price_asc">Lowest Price</option>
          <option value="price_desc">Highest Price</option>
          <option value="rating_desc">Highest Rating</option>
        </select>
      </div>
    </div>
  );
}
