import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Filter, RotateCcw } from 'lucide-react';
import { Badge } from '../ui/badge';

export const FiltersPanel = ({ filters, onFilterChange, onReset, data }) => {
  // Get unique values for filters
  const ageGroups = ['all', ...new Set(data.map(p => p.age_group).filter(Boolean))];
  const genders = ['all', 'Male', 'Female', 'Other'];
  const deviceTypes = ['all', ...new Set(data.map(p => p.device_type).filter(Boolean))];

  const activeFiltersCount = Object.values(filters).filter(v => v !== 'all').length;

  return (
    <Card className="border-2 animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            <CardTitle>Filters</CardTitle>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary">{activeFiltersCount} active</Badge>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            disabled={activeFiltersCount === 0}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Age Group Filter */}
          <div className="space-y-2">
            <Label htmlFor="age-group">Age Group</Label>
            <Select
              value={filters.ageGroup}
              onValueChange={(value) => onFilterChange('ageGroup', value)}
            >
              <SelectTrigger id="age-group">
                <SelectValue placeholder="Select age group" />
              </SelectTrigger>
              <SelectContent>
                {ageGroups.map(group => (
                  <SelectItem key={group} value={group}>
                    {group === 'all' ? 'All Age Groups' : group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Gender Filter */}
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={filters.gender}
              onValueChange={(value) => onFilterChange('gender', value)}
            >
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                {genders.map(gender => (
                  <SelectItem key={gender} value={gender}>
                    {gender === 'all' ? 'All Genders' : gender}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Device Type Filter */}
          <div className="space-y-2">
            <Label htmlFor="device-type">Device Type</Label>
            <Select
              value={filters.deviceType}
              onValueChange={(value) => onFilterChange('deviceType', value)}
            >
              <SelectTrigger id="device-type">
                <SelectValue placeholder="Select device" />
              </SelectTrigger>
              <SelectContent>
                {deviceTypes.map(device => (
                  <SelectItem key={device} value={device}>
                    {device === 'all' ? 'All Devices' : device}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.ageGroup !== 'all' && (
              <Badge variant="secondary" className="gap-2">
                Age: {filters.ageGroup}
                <button
                  onClick={() => onFilterChange('ageGroup', 'all')}
                  className="ml-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            )}
            {filters.gender !== 'all' && (
              <Badge variant="secondary" className="gap-2">
                Gender: {filters.gender}
                <button
                  onClick={() => onFilterChange('gender', 'all')}
                  className="ml-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            )}
            {filters.deviceType !== 'all' && (
              <Badge variant="secondary" className="gap-2">
                Device: {filters.deviceType}
                <button
                  onClick={() => onFilterChange('deviceType', 'all')}
                  className="ml-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FiltersPanel;
