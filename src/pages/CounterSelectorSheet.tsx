import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckIcon, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { round, zodDecimal } from "@/lib/decimal";
import { mutate } from "@/lib/request";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useTranslation } from "@/hooks/useTranslation";

import { CounterData } from "@/types/cashSession";
import cashSessionApi from "@/types/cashSessionApi";

const formSchema = z.object({
  counter_x_care_id: z.string().min(1, "Please select a counter"),
  opening_balance: zodDecimal({ min: 0 }),
});

type FormValues = z.infer<typeof formSchema>;

interface CounterSelectorSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  facilityId: string;
  counters: CounterData[];
  onSessionCreated: () => void;
}

export default function CounterSelectorSheet({
  open,
  onOpenChange,
  facilityId,
  counters,
  onSessionCreated,
}: CounterSelectorSheetProps) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      counter_x_care_id: "",
      opening_balance: "0",
    },
  });

  const { mutate: openSession, isPending } = useMutation({
    mutationFn: mutate(cashSessionApi.openSession, {
      pathParams: { facilityId: facilityId },
    }),
    onSuccess: () => {
      toast.success(t("session_opened_successfully"));
      // Invalidate counters - this will update userCounter which triggers session fetch
      queryClient.invalidateQueries({
        queryKey: ["cash-counters", facilityId],
      });
      form.reset();
      onSessionCreated();
    },
    onError: () => {
      toast.error(t("failed_to_open_session"));
    },
  });

  const onSubmit = (values: FormValues) => {
    openSession({
      counter_x_care_id: values.counter_x_care_id,
      opening_balance: round(values.opening_balance),
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{t("start_session")}</SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 py-6"
          >
            <FormField
              control={form.control}
              name="opening_balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("opening_balance")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        {t("currency_symbol")}
                      </span>
                      <Input
                        type="number"
                        min="0"
                        {...field}
                        className="pl-8"
                        placeholder="0.00"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="counter_x_care_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    {t("select_counter")}
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="space-y-2"
                    >
                      {counters.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-green-600">
                            {t("available_counters")}
                          </p>
                          {counters.map((counter) => (
                            <label
                              key={counter.id}
                              className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                              <RadioGroupItem value={counter.x_care_id} />
                              <div className="flex-1">
                                <span className="font-medium">
                                  {counter.name}
                                </span>
                                {counter.is_main_cash && (
                                  <Badge
                                    variant="secondary"
                                    className="ml-2 text-xs"
                                  >
                                    {t("main_cash")}
                                  </Badge>
                                )}
                              </div>
                              <CheckIcon className="size-5 text-green-500" />
                            </label>
                          ))}
                        </div>
                      )}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                {t("cancel")}
              </Button>
              <Button
                type="submit"
                disabled={isPending || !form.formState.isValid}
              >
                {isPending ? (
                  <>
                    <Loader className="mr-2 size-4 animate-spin" />
                    {t("opening")}
                  </>
                ) : (
                  t("start_session")
                )}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
