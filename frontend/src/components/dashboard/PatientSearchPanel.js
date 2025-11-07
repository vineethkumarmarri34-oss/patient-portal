import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Search, User } from 'lucide-react';
import { Badge } from '../ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';

export const PatientSearchPanel = ({ data, onPatientSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);

  // Get unique patients
  const uniquePatients = useMemo(() => {
    const patientMap = new Map();
    data.forEach(record => {
      if (!patientMap.has(record.patient_id)) {
        patientMap.set(record.patient_id, record);
      }
    });
    return Array.from(patientMap.values());
  }, [data]);

  // Filter patients based on search
  const filteredPatients = useMemo(() => {
    if (!searchTerm) return uniquePatients.slice(0, 10);
    
    const term = searchTerm.toLowerCase();
    return uniquePatients
      .filter(p => 
        p.patient_name.toLowerCase().includes(term) ||
        p.patient_id.toLowerCase().includes(term)
      )
      .slice(0, 10);
  }, [searchTerm, uniquePatients]);

  const handlePatientClick = (patient) => {
    onPatientSelect(patient);
    setOpen(false);
    setSearchTerm('');
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-primary" />
          <CardTitle>Patient Search</CardTitle>
          <Badge variant="secondary">Admin Access</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-start text-left font-normal"
            >
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <span className="text-muted-foreground">
                Search by patient name or ID...
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0" align="start">
            <Command>
              <CommandInput 
                placeholder="Search patients..." 
                value={searchTerm}
                onValueChange={setSearchTerm}
              />
              <CommandList>
                <CommandEmpty>No patients found.</CommandEmpty>
                <CommandGroup heading="Patients">
                  {filteredPatients.map((patient) => (
                    <CommandItem
                      key={patient.patient_id}
                      onSelect={() => handlePatientClick(patient)}
                      className="cursor-pointer"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <div className="flex-1">
                        <p className="font-semibold">{patient.patient_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {patient.patient_id} • {patient.age}y • {patient.gender}
                        </p>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        {patient.engagement_level}
                      </Badge>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
};

export default PatientSearchPanel;
