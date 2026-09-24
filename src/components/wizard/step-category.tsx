'use client';

import React from 'react';
import { CIVIC_CATEGORIES } from '@/lib/constants/categories';
import { useLanguage } from '@/components/providers/language-provider';
import { 
  Road, 
  Train, 
  Droplets, 
  Zap, 
  Building2, 
  Radio, 
  Trees, 
  Cross, 
  Coins, 
  ShoppingBag, 
  Plane, 
  Wheat, 
  HelpCircle,
  CheckCircle2,
  Landmark
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  Road,
  Train,
  Droplets,
  Zap,
  Building2,
  Radio,
  Trees,
  Cross,
  Coins,
  ShoppingBag,
  Plane,
  Wheat,
  HelpCircle,
};

interface StepCategoryProps {
  selectedCategory: string;
  selectedSubcategory: string;
  onSelect: (category: string, subcategory: string) => void;
}

export function StepCategory({
  selectedCategory,
  selectedSubcategory,
  onSelect,
}: StepCategoryProps) {
  const { isTamil, isHindi } = useLanguage();

  const currentCategoryData = CIVIC_CATEGORIES.find(c => c.id === selectedCategory);

  const getTitle = () => {
    if (isTamil) return '1. மத்திய துறை / அமைச்சகத்தை தேர்ந்தெடுக்கவும்';
    if (isHindi) return '1. केंद्रीय मंत्रालय / शिकायत क्षेत्र चुनें';
    return '1. Select Central Grievance Sector & Ministry';
  };

  const getSubtitle = () => {
    if (isTamil) return 'உங்கள் பொதுக் குறைக்குரிய சரியான மத்திய அரசு அமைச்சகம் அல்லது தேசிய பொதுப் பிரிவை தேர்வு செய்யவும்.';
    if (isHindi) return 'अपनी जन शिकायत के लिए उपयुक्त केंद्रीय मंत्रालय या राष्ट्रीय प्राधिकरण का चयन करें।';
    return 'Select the appropriate Union Ministry or National Authority responsible for your grievance.';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h3 className="text-xl font-bold text-navy-950 dark:text-white">
          {getTitle()}
        </h3>
        <p className="text-sm text-navy-600 dark:text-navy-400 mt-1">
          {getSubtitle()}
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {CIVIC_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const Icon = iconMap[cat.icon] || HelpCircle;

          const catName = isTamil ? cat.nameTa : (isHindi ? cat.nameHi : cat.nameEn);
          const catDesc = isTamil ? cat.descriptionTa : (isHindi ? cat.descriptionHi : cat.descriptionEn);
          const minName = isTamil ? cat.ministryTa : (isHindi ? cat.ministryHi : cat.ministryEn);

          return (
            <div
              key={cat.id}
              onClick={() => onSelect(cat.id, cat.subcategoriesEn[0])}
              className={cn(
                'group relative p-4 rounded-xl border cursor-pointer transition-all duration-150 text-left select-none',
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-600/20 shadow-sm'
                  : 'border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-900 hover:border-navy-300 dark:hover:border-navy-700 hover:bg-navy-50/60 dark:hover:bg-navy-800/60'
              )}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors',
                    isSelected
                      ? 'bg-emerald-600 text-white'
                      : 'bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300 group-hover:bg-navy-200 dark:group-hover:bg-navy-700'
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm text-navy-950 dark:text-white truncate">
                      {catName}
                    </h4>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 ml-1" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5 mb-1">
                    <Landmark className="w-3 h-3 text-amber-500 shrink-0" />
                    <span className="text-[11px] font-medium text-amber-700 dark:text-amber-400 truncate">
                      {minName}
                    </span>
                  </div>
                  <p className="text-xs text-navy-500 dark:text-navy-400 line-clamp-2 leading-relaxed">
                    {catDesc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subcategories Selector if Category Selected */}
      {currentCategoryData && (
        <div className="mt-6 p-5 rounded-xl border border-navy-200 dark:border-navy-800 bg-navy-50/70 dark:bg-navy-900/70 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy-700 dark:text-navy-300">
              {isTamil ? 'குறிப்பிட்ட துணைப் பிரிவு' : (isHindi ? 'विशिष्ट उप-श्रेणी / समस्या का प्रकार' : 'Specific Subcategory / Issue Type')}
            </h4>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {currentCategoryData.subcategoriesEn.length} options available
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(isTamil ? currentCategoryData.subcategoriesTa : (isHindi ? currentCategoryData.subcategoriesHi : currentCategoryData.subcategoriesEn)).map((sub, index) => {
              const engSub = currentCategoryData.subcategoriesEn[index];
              const isSubSelected = selectedSubcategory === engSub;

              return (
                <button
                  key={engSub}
                  type="button"
                  onClick={() => onSelect(selectedCategory, engSub)}
                  className={cn(
                    'px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all',
                    isSubSelected
                      ? 'bg-navy-950 dark:bg-emerald-600 text-white shadow-xs'
                      : 'bg-white dark:bg-navy-800 border border-navy-200 dark:border-navy-700 text-navy-700 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-navy-700'
                  )}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
